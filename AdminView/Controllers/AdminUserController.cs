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
    private readonly IFirebaseAuthService _firebaseAuthService;
    private static int userId;
    public AdminUserController(ILogger<AdminUserController> logger, IAdminUserService adminUserService, IFirebaseAuthService firebaseAuthService)
    {
        _logger = logger;
        _adminUserService = adminUserService;
        _firebaseAuthService = firebaseAuthService;
    }

    [HttpPost("login")]
    public async Task<StatusCodeResult> Login(string token)
    {
        HttpContext.Session.SetString("atoken", token);
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

    [HttpGet("cookie")]
    public async Task<IActionResult> GetSession()
    {
        try
        {
            var firebaseId = (await _firebaseAuthService.VerifyIdToken(HttpContext.Session.GetString("atoken"))).Uid;
            AdminUser user = await _adminUserService.GetUserByFirebaseUid(firebaseId);
            return Ok(new { Name = user.FullName, Username = user.Id, Avatar = user.Avatar, Role = user.RoleId });
        }
        catch
        {
            return Ok();
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