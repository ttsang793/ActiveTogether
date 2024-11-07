using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using cartservices.DTO;
using cartservices.Data;
using cartservices.Models;

namespace cartservices.Controllers;

[Route("[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private ILogger<OrderController> _logger;
    public UserController(ILogger<OrderController> logger) { _logger = logger; }
    private AtWebContext _dbContext = new();

    [HttpPost("register")]
    public StatusCodeResult Register([Bind("Username", "Password", "Phone", "Email", "Address")] UserRegisterDTO user)
    {
        _dbContext.Users.Add(new User
        {
            Username = user.Username,
            Password = user.Password,
            Email = user.Email,
            Phone = user.Phone,
            Point = 0,
            DateCreated = DateTime.Now
        });
        _dbContext.SaveChanges();

        int id = _dbContext.Users.OrderByDescending(u => u.Id).First().Id;
        _dbContext.UserAddresses.Add(new UserAddress
        {
            UserId = id,
            Type = "Mặc định",
            Address = user.Address!
        });
        _dbContext.SaveChanges();
        return StatusCode(200);
    }

    [HttpPost("login")]
    public StatusCodeResult Login([Bind("Username", "Password")] UserLoginDTO user)
    {
        try
        {
            var p = _dbContext.Users.FirstOrDefault(u => u.Username.Equals(user.Username)).Password;
            if (user.Password.Equals(p)) return StatusCode(200);
            else return StatusCode(500);
        }
        catch { return StatusCode(404); }
    }

    [HttpGet("")]
    public User GetUserByUsername(string username)
    {
        var user = _dbContext.Users.First(u => u.Username == username);
        user.Password = "";
        user.Id = 0;
        return user;
    }

    [HttpPost("updateInfo")]
    public StatusCodeResult UpdateInfo([Bind("Fullname", "Phone", "Email")] UserUpdateInfoDTO user, string username)
    {
        var u = _dbContext.Users.First(u => u.Username == username);
        if (u != null)
        {
            u.FullName = user.FullName;
            u.Phone = user.Phone;
            u.Email = user.Email;
            _dbContext.SaveChanges();
            return StatusCode(200);
        }
        else return StatusCode(404);
    }

    [HttpPost("update")]
    public StatusCodeResult UpdatePassword([Bind("Old", "New")] UserUpdateDTO user, string username)
    {

        var u = _dbContext.Users.First(u => u.Username == username && u.Password == user.Old);
        if (u != null)
        {
            u.Password = user.New!;
            _dbContext.SaveChanges();
            return StatusCode(200);
        }
        else return StatusCode(404);
    }

    [HttpGet("get/address")]
    public IEnumerable<UserAddress> GetAddressByUsername(string username)
    {
        return (from ua in _dbContext.UserAddresses join u in _dbContext.Users on ua.UserId equals u.Id
                where u.Username == username select ua).ToList();
    }

    [HttpPost("update/address")]
    public StatusCodeResult UpdateAddressByUsername([Bind("AddressList")] UserAddressDTO address, string username)
    {
        var oldUserAddresses = GetAddressByUsername(username);
        _dbContext.UserAddresses.RemoveRange(oldUserAddresses);
        _dbContext.SaveChanges();

        foreach (var a in address.AddressList)
        {
            _dbContext.UserAddresses.Add(new UserAddress
            {
                UserId = a.UserId,
                Address = a.Address,
                Type = a.Type
            });
            _dbContext.SaveChanges();
        }
        
        return StatusCode(200);
    }
}
