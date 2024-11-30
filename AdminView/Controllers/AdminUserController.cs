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
    private static int userId;
    public AdminUserController(ILogger<AdminUserController> logger, IAdminUserService adminUserService)
    {
        _logger = logger;
        _adminUserService = adminUserService;
    }

    [HttpPost("login")]
    public async Task<StatusCodeResult> Login([Bind("Id")] AdminLoginDTO user)
    {
        AdminUser result = await _adminUserService.Login(user);

        /*
        if (result == null) return StatusCode(404);
        else if (result.RoleId == null) return StatusCode(500);
        else if (!(bool)result.IsActive) return StatusCode(403);

        HttpContext.Session.SetString("name", result.FullName!);
        HttpContext.Session.SetInt32("username", result.Id);
        HttpContext.Session.SetString("avatar", result.Avatar!);
        HttpContext.Session.SetInt32("role", (int)result.RoleId!);*/

        return StatusCode(200);
    }

    [HttpGet("cookie")]
    public IActionResult GetSession()
    {
        var name = HttpContext.Session.GetString("name");
        var username = HttpContext.Session.GetInt32("username");
        var avatar = HttpContext.Session.GetString("avatar");
        var role = HttpContext.Session.GetInt32("role");
        return Ok(new { Name = name, Username = username, Avatar = avatar, Role = role });
    }

    [HttpPost("logout")]
    public void Logout()
    {
        HttpContext.Session.Remove("name");
        HttpContext.Session.Remove("username");
        HttpContext.Session.Remove("avatar");
        HttpContext.Session.Remove("role");
    }

    [HttpGet("get")]
    public async Task<AdminUser> GetUserById(int id)
    {
        return await _adminUserService.GetUserById(id);
    }

    [HttpPut("updateInfo")]
    public async Task<StatusCodeResult> UpdateInfo(UserUpdateInfoDTO user, int id)
    {
        userId = id;
        HttpContext.Session.SetString("avatar", user.Avatar);
        return (await _adminUserService.UpdateInfo(user, id)) ? Ok() : BadRequest();
    }

    [HttpPost("updateAvatar")]
    public async Task<StatusCodeResult> UploadImage(IFormFile file)
    {
        return (await _adminUserService.UploadImage(file, userId)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPost("updateAccount")]
    public async Task<StatusCodeResult> UpdatePassword(UserUpdateDTO user, int id)
    {
        return (await _adminUserService.UpdatePassword(user, id)) ? Ok() : BadRequest();
    }
}