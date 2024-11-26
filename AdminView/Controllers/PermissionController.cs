using Application.Interface;
using Core.Entity;
using Core.DTO;
using Microsoft.AspNetCore.Mvc;

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
		return await _permissionService.GetAllAdminUsers();
	}

	[HttpGet("role/get")]
	public async Task<IEnumerable<Role>> GetAllRoles()
	{
		return await _permissionService.GetAllRoles();
	}

	[HttpPost("adminuser/insert")]
	public async Task<StatusCodeResult> InsertAdmin(AdminUser adminUser)
	{
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

	[HttpPost("role/insert")]
	public async Task<StatusCodeResult> InsertRole([Bind("Id", "Name", "PermissionIds")] RoleDTO roleDTO)
	{
		var role = new Role { Id = (int)roleDTO.Id, Name = roleDTO.Name };
		List<RolePermission> rolePermissions = new();

		foreach (var per in roleDTO.PermissionIds)
			rolePermissions.Add(new RolePermission { RoleId = (int)roleDTO.Id, PermissionId = per });

		role.RolePermissions = rolePermissions;

		return (await _permissionService.InsertRole(role)) ? StatusCode(200) : StatusCode(404);
	}

	[HttpPut("role/update")]
	public async Task<StatusCodeResult> UpdateRole([Bind("Id", "Name", "PermissionIds")] RoleDTO roleDTO)
    {
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