using Application.Interface;
using Core.DTO;
using Core.Entity;
using Microsoft.AspNetCore.Mvc;
using MySqlX.XDevAPI.Common;

namespace UserView.Controllers;

[Route("[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly IUserService _userService;
    private readonly IUserAddressService _userAddressService;
    private static string userChange = "";

    public UserController(ILogger<UserController> logger, IUserService userService, IUserAddressService userAddressService)
    {
        _logger = logger;
        _userService = userService;
		_userAddressService = userAddressService;
    }

    [HttpPost("register")]
    public async Task<StatusCodeResult> Register([Bind("Username", "Password", "Phone", "Email", "Address")] UserRegisterDTO user)
    {
        return (await _userService.Register(user)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPost("login")]
    public async Task<StatusCodeResult> Login([Bind("Username", "Password")] UserLoginDTO user)
    {
        if (_userService.GetUserIdByUsername(user.Username) == -1) return StatusCode(404);

        User result = await _userService.Login(user);
        if (result == null) return StatusCode(500);

        HttpContext.Session.SetString("name", result.FullName);
        HttpContext.Session.SetString("username",  result.Username);
        HttpContext.Session.SetString("avatar", result.Avatar);
        HttpContext.Session.SetInt32("role", 0);

        return StatusCode(200);
    }

    [HttpGet("cookie")]
    public IActionResult GetSession()
    {
        var name = HttpContext.Session.GetString("name");
        var username = HttpContext.Session.GetString("username");
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

    [HttpPost("avatar/upload")]
    public async Task<StatusCodeResult> UploadImage(IFormFile file)
    {
        return (await _userService.UploadImage(file, userChange)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpGet("")]
    public User GetUserByUsername(string username)
    {
        return _userService.GetUserByUsername(username);
    }

    [HttpPut("updateInfo")]
    public async Task<StatusCodeResult> UpdateInfo([Bind("Fullname", "Phone", "Email", "Avatar")] UserUpdateInfoDTO user, string username)
    {
        userChange = username;
        HttpContext.Session.SetString("name", user.FullName);
        HttpContext.Session.SetString("avatar", user.Avatar);
        return (await _userService.UpdateInfo(user, username)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("update")]
    public async Task<StatusCodeResult> UpdatePassword([Bind("Old", "New")] UserUpdateDTO user, string username)
    {
        return (await _userService.UpdatePassword(user, username)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpGet("get/address")]
    public IEnumerable<UserAddress> GetAddressByUsername(string username)
    {
		return _userAddressService.GetAddressByUsername(username);
    }

    [HttpPut("update/address")]
    public async Task<StatusCodeResult> UpdateAddressByUsername([Bind("AddressList")] UserAddressDTO address, string username)
	{
		return (await _userAddressService.UpdateAddressByUsername(address, username)) ? StatusCode(200) : StatusCode(404);
	}
}