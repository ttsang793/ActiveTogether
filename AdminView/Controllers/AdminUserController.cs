using Application.Interface;
using Application.Service;
using Core.DTO;
using Core.Entity;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;

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

    [HttpGet("get")]
    public AdminUser GetUserById(int id)
    {
        return _adminUserService.GetUserById(id);
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