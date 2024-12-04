using Application.Interface;
using Core.DTO;
using Core.Entity;
using Microsoft.AspNetCore.Mvc;

namespace AdminView.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AdminUserController : ControllerBase
{
    private readonly ILogger<AdminUserController> _logger;
    private readonly IAdminUserService _adminUserService;
    private readonly IPermissionService _permissionService;
    private readonly IFirebaseAuthService _firebaseAuthService;
    private static List<RolePermission> permission = new();
    private static List<int> permissionGroup = new();

    private static int userId;
    public AdminUserController(ILogger<AdminUserController> logger, IAdminUserService adminUserService, IFirebaseAuthService firebaseAuthService, IPermissionService permissionService)
    {
        _logger = logger;
        _adminUserService = adminUserService;
        _permissionService = permissionService;
        _firebaseAuthService = firebaseAuthService;
    }

    [HttpPost("login")]
    public async Task<StatusCodeResult> Login(string token)
    {
        HttpContext.Session.SetString("atoken", token);
        var firebaseId = (await _firebaseAuthService.VerifyIdToken(token)).Uid;
        permission = (await _adminUserService.GetUserByFirebaseUid(firebaseId)).Role.RolePermissions.ToList();
        permissionGroup = new List<int>();
        foreach (var per in permission)
        {
            int pgId = (int)(await _permissionService.GetAllPermission()).Where(p => p.Id == per.PermissionId).First().PermissionGroupId;
            if (!permissionGroup.Contains(pgId)) permissionGroup.Add(pgId);
        }
        return StatusCode(200);
    }

    [HttpGet("get/email")]
    public async Task<string> GetEmailByUserId(int id)
    {
        try
        {
            return (await _adminUserService.GetUserById(id)).Email;
        }
        catch
        {
            return null;
        }
    }

    [HttpPost("cookie")]
    public async Task<LoginAdminDTO> GetSession([Bind("Id")] AdminPageDTO pageId)
    {
        try
        {
            var firebaseId = (await _firebaseAuthService.VerifyIdToken(HttpContext.Session.GetString("atoken"))).Uid;
            AdminUser user = await _adminUserService.GetUserByFirebaseUid(firebaseId);
            Console.WriteLine(permissionGroup.Count);

            return new LoginAdminDTO { Name = user.FullName, Username = user.Id, Avatar = user.Avatar, Role = user.RoleId, PermissionGroup = permissionGroup  };
        }
        catch
        {
            return null;
        }
    }

    [HttpPost("logout")]
    public void Logout()
    {
        HttpContext.Session.Remove("atoken");
    }

    [HttpGet("get")]
    public async Task<AdminUser> GetUserById(int id)
    {
        return await _adminUserService.GetUserById(id);
    }

    [HttpPut("update")]
    public async Task<StatusCodeResult> Update(UserUpdateInfoDTO user, int id)
    {
        userId = id;
        HttpContext.Session.SetString("avatar", user.Avatar);
        return (await _adminUserService.Update(user, id)) ? Ok() : BadRequest();
    }

    [HttpPost("updateAvatar")]
    public async Task<StatusCodeResult> UploadImage(IFormFile file)
    {
        return (await _adminUserService.UploadImage(file, userId)) ? StatusCode(200) : StatusCode(404);
    }
}