using Core.Interface;
using Core.Entity;
using Core.DTO;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository;
public class UserRepository : BaseRepository<User>, IUserRepository
{
    private readonly string _uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "..\\reactapp\\src\\Images\\avatar");
    public UserRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public async Task<string> GetEmailByUsername(string username)
    {
        return (await GetDbSet().Where(u => u.Username == username).FirstOrDefaultAsync()).Email;
    }

    public int Register(UserRegisterDTO user)
    {
        GetDbSet().Add(new User
        {
            FirebaseUid = user.FirebaseUid,
            Username = user.Username,
            FullName = user.FullName,
            DateCreated = DateTime.Now,
            Phone = user.Phone,
            Email = user.Email,
            Point = 0,
            Avatar = "/src/images/avatar/default.jpg"
        });

        return GetDbSet().OrderByDescending(o => o.Id).First().Id;
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

    public async Task<User> GetUserByFirebaseUid(string uid)
    {
        try
        {
            var user = await GetDbSet().Where(u => u.FirebaseUid == uid).FirstAsync();
            return user;
        }
        catch
        {
            return null;
        }
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
        //var u = GetDbSet().First(u => u.Username == username && u.Password == user.Old);
        //if (u != null) u.Password = user.New!;
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