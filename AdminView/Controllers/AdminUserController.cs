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
    public async Task<StatusCodeResult> Login([Bind("Username", "Password")] UserLoginDTO user)
    {
        if (_adminUserService.GetUserById(int.Parse(user.Username)) == null) return StatusCode(404);

        AdminUser result = _adminUserService.Login(user);
        if (result == null) return StatusCode(500);

        HttpContext.Session.SetString("name", result.FullName);
        HttpContext.Session.SetString("username", result.Id.ToString());
        HttpContext.Session.SetString("avatar", result.Avatar);
        HttpContext.Session.SetInt32("role", 0);

        return StatusCode(200);
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