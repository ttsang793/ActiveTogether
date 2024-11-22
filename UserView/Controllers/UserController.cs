using Application.Interface;
using Core.DTO;
using Core.Entity;
using Microsoft.AspNetCore.Mvc;

namespace UserView.Controllers;

[Route("[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly IUserService _userService;
    private readonly IUserAddressService _userAddressService;

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
        if (_userService.GetUserByUsername(user.Username) == null) return StatusCode(404);
        return (await _userService.Login(user)) ? StatusCode(200) : StatusCode(500);
    }

    [HttpGet("")]
    public User GetUserByUsername(string username)
    {
        return _userService.GetUserByUsername(username);
    }

    [HttpPut("updateInfo")]
    public async Task<StatusCodeResult> UpdateInfo([Bind("Fullname", "Phone", "Email")] UserUpdateInfoDTO user, string username)
    {
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