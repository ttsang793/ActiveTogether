using Application.Interface;
using Core.DTO;
using Core.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UserView.Controllers;

[Route("[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly IUserService _userService;
    private readonly IUserAddressService _userAddressService;
    private readonly IFirebaseAuthService _firebaseAuthService;
    private static string userChange = "";

    public UserController(ILogger<UserController> logger, IUserService userService, IUserAddressService userAddressService, IFirebaseAuthService firebaseAuthService)
    {
        _logger = logger;
        _userService = userService;
        _userAddressService = userAddressService;
        _firebaseAuthService = firebaseAuthService;
    }

    [HttpPost("register")]
    public async Task<StatusCodeResult> Register([Bind("FirebaseUid", "Username", "FullName", "Phone", "Email", "Address")] UserRegisterDTO user)
    {
        return (await _userService.Register(user)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPost("register/google")]
    public async Task<StatusCodeResult> RegisterGoogle([Bind("FirebaseUid", "Username", "FullName", "Phone", "Email", "Address")] UserRegisterDTO user)
    {
        HttpContext.Session.SetString("token", HttpContext.Session.GetString("tempToken"));
        return await Register(user);
    }

    [HttpGet("get/email")]
    public async Task<string> GetEmailByUsername(string username)
    {
        return (await _userService.GetEmailByUsername(username));
    }

    [HttpPost("login")]
    public StatusCodeResult Login(string token)
    {

        HttpContext.Session.SetString("token", token);
        return StatusCode(200);
    }

    [HttpGet("cookie")]
    public async Task<IActionResult> GetSession()
    {
        try
        {
            var firebaseId = (await _firebaseAuthService.VerifyIdToken(HttpContext.Session.GetString("token"))).Uid;
            User user = await _userService.GetUserByFirebaseUid(firebaseId);
            return Ok(new { Name = user.FullName, Username = user.Username, Avatar = user.Avatar });
        }
        catch
        {
            return Ok();
        }
    }

    [HttpPost("logout")]
    public void Logout()
    {
        HttpContext.Session.Remove("token");
    }

    [HttpPost("forgetPassword")]
    public async Task<StatusCodeResult> ForgetPassword([Bind("Username", "Phone", "Email")] UserRegisterDTO user)
    {
        try
        {
            var userForget = await _userService.GetUserByUsername(user.Username);
            if (userForget == null) return StatusCode(400);
            return (userForget.Phone == user.Phone && userForget.Email == user.Email) ? StatusCode(200) : StatusCode(400);
        }
        catch
        {
            return StatusCode(404);
        }
    }

    [HttpPost("avatar/upload")]
    public async Task<StatusCodeResult> UploadImage(IFormFile file)
    {
        return (await _userService.UploadImage(file, userChange)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpGet("get/detail")]
    public async Task<User> GetUserByFirebaseUid()
    {
        var firebaseId = (await _firebaseAuthService.VerifyIdToken(HttpContext.Session.GetString("token"))).Uid;
        return await _userService.GetUserByFirebaseUid(firebaseId);
    }

    [HttpPost("login/check")]
    public async Task<StatusCodeResult> IsUserRegister([Bind("TempToken", "Email")] GoogleLoginDTO googleLoginDTO)
    {
        var firebaseUid = (await _firebaseAuthService.VerifyIdToken(googleLoginDTO.TempToken)).Uid;
        var user = await _userService.GetUserByFirebaseUid(firebaseUid);
        if (user != null) return StatusCode(200);
        HttpContext.Session.SetString("tempToken", googleLoginDTO.TempToken);
        HttpContext.Session.SetString("tempEmail", googleLoginDTO.Email);
        return StatusCode(404);
    }

    [HttpGet("login/tempToken")]
    public async Task<StatusCodeResult> GetTempToken()
    {
        try
        {
            var idToken = await _firebaseAuthService.VerifyIdToken(HttpContext.Session.GetString("tempToken"));
            return StatusCode(200);
        }
        catch
        {
            return StatusCode(404);
        }
    }

    [HttpDelete("login/clearTemp")]
    public void ClearTempToken()
    {
        HttpContext.Session.Remove("tempEmail");
        HttpContext.Session.Remove("tempToken");
    }

    [HttpPut("updateInfo")]
    public async Task<StatusCodeResult> UpdateInfo([Bind("Fullname", "Phone", "Email", "Avatar")] UserUpdateInfoDTO user, string username)
    {
        userChange = username;
        return (await _userService.UpdateInfo(user, username)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpGet("get/address")]
    public async Task<IEnumerable<UserAddress>> GetAddressByUsername(string username)
    {
		return await _userAddressService.GetAddressByUsername(username);
    }

    [HttpPut("update/address")]
    public async Task<StatusCodeResult> UpdateAddressByUsername([Bind("AddressList")] UserAddressListDTO address, string username)
	{
		return (await _userAddressService.UpdateAddressByUsername(address, username)) ? StatusCode(200) : StatusCode(404);
	}

    [HttpDelete("lock")]
    public async Task<StatusCodeResult> Lock(string username)
    {
        return (await _userService.Lock(username)) ? StatusCode(200) : StatusCode(404);
    }
}