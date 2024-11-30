using Core.Interface;
using Core.DTO;
using Core.Entity;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Repository;
public class AdminUserRepository : BaseRepository<AdminUser>, IAdminUserRepository
{
    private readonly string _uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "..\\reactapp\\src\\Images\\avatar");
    public AdminUserRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public async Task<IEnumerable<AdminUser>> GetAllAdminUsers()
    {
        return await GetDbSet().Where(u => !u.FullName.Contains("Admin")).ToListAsync();
    }

    public async Task<AdminUser> GetUserById(int id)
    {
        try
        {
            var user = await GetDbSet().Where(u => u.Id == id).FirstAsync();
            return user;
        }
        catch
        {
            return null;
        }
    }

    public async Task<bool> UpdateInfo(UserUpdateInfoDTO user, int id)
    {
        var u = await GetUserById(id);
        if (u != null)
        {
            u.Phone = user.Phone;
            u.Email = user.Email;
            u.Avatar = user.Avatar;
            GetDbSet().Update(u);
        }
        return true;
    }

    public async Task<bool> UpdatePassword(UserUpdateDTO user, int id)
    {
        /*
        var u = await GetDbSet().FirstAsync(u => u.Id == id && u.Password == user.Old);
        if (u != null) u.Password = user.New!;*/
        return true;
    }

    public async Task<bool> UploadImage(IFormFile file, int id)
    {
        try
        {
            var fileName = "NV_" + id + Path.GetExtension(file.FileName);
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

    public void Insert(AdminUser adminUser)
    {
        GetDbSet().Add(adminUser);
    }

    public async Task<bool> Update(int id, int roleId)
    {
        var adminUser = await GetUserById(id);
        adminUser.RoleId = roleId;
        GetDbSet().Update(adminUser);
        return true;
    }

    public async Task<bool> Lock(int id)
    {
        AdminUser user = await GetUserById(id);
        //user.IsActive = false;
        return true;
    }
}