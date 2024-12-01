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

    public async Task<int> Register(UserRegisterDTO user)
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

        return (await GetDbSet().OrderByDescending(o => o.Id).FirstAsync()).Id;
    }

    public async Task<int> GetUserIdByUsername(string username)
    {
        try {
            return (await GetDbSet().FirstAsync(u => u.Username == username)).Id;
        }
        catch {
            return -1;
        }
    }

    public async Task<User> GetUserByUsername(string username)
    {
        try
        {
            return await GetDbSet().FirstAsync(u => u.Username == username);
        }
        catch
        {
            return null;
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

    public async Task UpdateInfo(UserUpdateInfoDTO user, string username)
    {
        var u = await GetDbSet().FirstAsync(u => u.Username == username);
        if (u != null)
        {
            u.FullName = user.FullName;
            u.Phone = user.Phone;
            u.Email = user.Email;
            u.Avatar = user.Avatar;
            GetDbSet().Update(u);
        }
    }

    public void GainPoint(int? userId, int? point)
    {
        var u = GetDbSet().First(u => u.Id == userId);
        u.Point += point;
    }

    private async Task<bool> DeleteImage(string username)
    {
        try
        {
            string[] files = Directory.GetFiles(_uploadDirectory, username + ".*");
            if (files.Any())
            {
                foreach (string file in files) File.Delete(file);
                return true;
            }
            else return false;
        }
        catch
        {
            return false;
        }
    }

    public async Task<bool> UploadImage(IFormFile file, string username)
    {
        try
        {
            var fileName = username + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(_uploadDirectory, fileName);

            await DeleteImage(username);

            using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            return true;
        }
        catch
        {
            return false;
        }
    }

    public async Task Lock(string username)
    {
        var u = await GetDbSet().FirstAsync(u => u.Username == username);
        if (u != null)
        {
            u.FirebaseUid = null;
            u.Username = null;
            u.DateCreated = null;
            u.Phone = null;
            u.Email = null;
            u.Point = 0;
            u.Avatar = null;
            
            await DeleteImage(username);
            GetDbSet().Update(u);
        }
    }
}