using Core.Interface;
using Core.Entity;
using Core.DTO;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Repository;
public class UserRepository : BaseRepository<User>, IUserRepository
{
    private readonly string _uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "..\\reactapp\\src\\Images\\avatar");
    public UserRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public int Register(UserRegisterDTO user)
    {
        GetDbSet().Add(new User
        {
            Username = user.Username,
            Password = user.Password,
            DateCreated = DateTime.Now,
            Phone = user.Phone,
            Email = user.Email,
            Point = 0,
            Avatar = "/src/images/avatar/default.jpg"
        });

        return GetDbSet().OrderByDescending(o => o.Id).First().Id;
    }

    public async Task<bool> Login(UserLoginDTO user)
    {
        var p = GetDbSet().FirstOrDefault(u => u.Username == user.Username);
        return (p != null && user.Password == p.Password);
    }

    public int GetUserIdByUsername(string username)
    {
        try {
            return GetDbSet().First(u => u.Username == username).Id;
        }
        catch {
            return -1;
        }
    }

    public User GetUserByUsername(string username)
    {
        var user = GetDbSet().Where(u => u.Username == username).First();
        user.Password = "";
        user.Id = 0;
        return user;
    }

    public void UpdateInfo(UserUpdateInfoDTO user, string username)
    {
        var u = GetDbSet().First(u => u.Username == username);
        if (u != null)
        {
            u.FullName = user.FullName;
            u.Phone = user.Phone;
            u.Email = user.Email;
            u.Avatar = user.Avatar;
        }
        GetDbSet().Update(u);
    }

    public void UpdatePassword(UserUpdateDTO user, string username)
    {
        var u = GetDbSet().First(u => u.Username == username && u.Password == user.Old);
        if (u != null) u.Password = user.New!;
    }

    public void GainPoint(int? userId, int? point)
    {
        var u = GetDbSet().First(u => u.Id == userId);
        u.Point += point;
    }

    public async Task<bool> UploadImage(IFormFile file, string username)
    {
        try
        {
            var fileName = username + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(_uploadDirectory, fileName);
            Console.WriteLine(filePath);

            using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            return true;
        }
        catch
        {
            return false;
        }
    }
}