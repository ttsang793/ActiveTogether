using Application.Interface;
using Core.Entity;
using Core.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace AdminView.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PermissionController : ControllerBase
{
    private readonly ILogger<PermissionController> _logger;
    private readonly IPermissionService _permissionService;
    public PermissionController(ILogger<PermissionController> logger, IPermissionService permissionService)
    {
        _logger = logger;
        _permissionService = permissionService;
    }
    
	[HttpGet("adminuser/get")]
	public async Task<IEnumerable<AdminUser>> GetAllAdminUsers()
	{
		return await _permissionService.GetAllAdminUsers(u => u.FullName != "Admin");
	}

	private string[] AdminUserDataValidation(AdminUserInsertDTO adminUserDTO)
	{
		bool errorFlag = false;
		string[] result = new string[4];

		if (adminUserDTO.FullName == "")
		{
			errorFlag = true;
			result[0] = "Vui lòng nhập tên của nhân viên";
		}
		else if (adminUserDTO.FullName.ToLower().Contains("admin"))
		{
			errorFlag = true;
			result[0] = "Tên không hợp lệ.";
		}
		if (adminUserDTO.Phone == "")
		{
			errorFlag = true;
			result[1] = "Vui lòng nhập số điện thoại";
		}
		else if (Regex.IsMatch(adminUserDTO.Phone, @"^0(([3,5,7,8,9][0-9]{8})|([2][0-9]{9}))$"))
		{
			errorFlag = true;
			result[1] = "Số điện thoại phải đúng định dạng (10 hoặc 11 số)";
		}
		if (adminUserDTO.Email == "")
		{
			errorFlag = true;
			result[2] = "Vui lòng nhập email";
		}
		else if (Regex.IsMatch(adminUserDTO.Email, @".+@[a-z]+(\.[a-z]*)+"))
		{
			errorFlag = true;
			result[2] = "Email phải đúng định dạng (example@mail.com)";
		}
		if (adminUserDTO.RoleId == -1)
		{
			errorFlag = true;
			result[3] = "Vui lòng chọn vai trò";
		}

		return errorFlag ? result : Array.Empty<string>();
	}

	[HttpPost("adminuser/insert")]
	public async Task<IActionResult> InsertAdmin([Bind("FullName", "Phone", "Email", "RoleId")]AdminUserInsertDTO adminUserDTO)
	{
		string[] validationResult = AdminUserDataValidation(adminUserDTO);
		if (validationResult.Length > 0) return BadRequest(new { errors = validationResult });

		AdminUser adminUser = new AdminUser
		{
			FullName = adminUserDTO.FullName,
			Phone = adminUserDTO.Phone,
			Email = adminUserDTO.Email,
			RoleId = adminUserDTO.RoleId,
			IsActive = true
		};
		return (await _permissionService.InsertAdmin(adminUser)) ? StatusCode(200) : StatusCode(404);
	}

	[HttpPut("adminuser/updaterole")]
    public async Task<StatusCodeResult> UpdateAdminRole(int id, int roleId)
	{
		return (await _permissionService.UpdateAdminRole(id, roleId)) ? StatusCode(200) : StatusCode(404);
	}


    [HttpPut("adminuser/lock")]
	public async Task<StatusCodeResult> LockAdmin(int id)
	{
		return (await _permissionService.LockAdmin(id)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpGet("role/get")]
    public async Task<IEnumerable<Role>> GetAllRoles()
    {
        return await _permissionService.GetAllRoles();
    }
    private async Task<string> RoleDataValidation(RoleDTO roleDTO)
    {
		if (roleDTO.Name == "") return "Vui lòng nhập tên vai trò";
		else if ((await _permissionService.GetAllRoles(r => r.Name == roleDTO.Name)).Any()) return "Tên vai trò không thể trùng với các vai trò khác";
		else return "";
    }

    [HttpPost("role/insert")]
	public async Task<IActionResult> InsertRole([Bind("Id", "Name", "PermissionIds")] RoleDTO roleDTO)
	{
		string validationResult = await RoleDataValidation(roleDTO);
		if (validationResult.Length > 0) return BadRequest(new { error = validationResult });

		var role = new Role { Id = (int)roleDTO.Id, Name = roleDTO.Name };
		List<RolePermission> rolePermissions = new();

		foreach (var per in roleDTO.PermissionIds)
			rolePermissions.Add(new RolePermission { RoleId = (int)roleDTO.Id, PermissionId = per });

		role.RolePermissions = rolePermissions;

		return (await _permissionService.InsertRole(role)) ? StatusCode(200) : StatusCode(404);
	}

	[HttpPut("role/update")]
	public async Task<IActionResult> UpdateRole([Bind("Id", "Name", "PermissionIds")] RoleDTO roleDTO)
    {
        string validationResult = await RoleDataValidation(roleDTO);
        if (validationResult.Length > 0) return BadRequest(new { error = validationResult });

        var role = new Role { Id = (int)roleDTO.Id, Name = roleDTO.Name };
        List<RolePermission> rolePermissions = new();

        foreach (var per in roleDTO.PermissionIds)
            rolePermissions.Add(new RolePermission { RoleId = (int)roleDTO.Id, PermissionId = per });

        role.RolePermissions = rolePermissions;

        return (await _permissionService.UpdateRole(role)) ? StatusCode(200) : StatusCode(404);
	}

	[HttpGet("role/getpermission")]
	public async Task<Role> GetAllRolePermissionsById(int id)
	{
		return await _permissionService.GetAllRolePermissionsById(id);
	}

	[HttpGet("get")]
    public async Task<IEnumerable<Permission>> GelAllPermission()
    {
        return await _permissionService.GelAllPermission();
    }
}