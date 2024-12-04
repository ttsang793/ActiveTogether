using Core.Interface;
using Core.DTO;
using Core.Entity;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.Linq.Expressions;

namespace Infrastructure.Repository;
public class AdminUserRepository : BaseRepository<AdminUser>, IAdminUserRepository
{
    private readonly string _uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "..\\reactapp\\src\\Images\\avatar");
    public AdminUserRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public async Task<IEnumerable<AdminUser>> GetAllAdminUsers(Expression<Func<AdminUser, bool>> expression = null)
    {
        return await GetDbSet().Where(expression).ToListAsync();
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

    public async Task<AdminUser> GetUserByFirebaseUid(string uid)
    {
        try
        {
            var user = await GetDbSet().Include(u => u.Role).ThenInclude(r => r.RolePermissions).Where(u => u.FirebaseUid == uid).FirstAsync();
            return user;
        }
        catch
        {
            return null;
        }
    }

    public void Insert(AdminUser adminUser)
    {
        GetDbSet().Add(adminUser);
    }

    public async Task Update(int id, int roleId)
    {
        var adminUser = await GetUserById(id);
        adminUser.RoleId = roleId;
        GetDbSet().Update(adminUser);
    }

    public async Task Update(UserUpdateInfoDTO user, int id)
    {
        var u = await GetUserById(id);
        if (u != null)
        {
            u.Phone = user.Phone;
            u.Email = user.Email;
            u.Avatar = user.Avatar;
            GetDbSet().Update(u);
        }
    }

    private async Task<bool> DeleteImage(int id)
    {
        try
        {
            string[] files = Directory.GetFiles(_uploadDirectory, $"NV_${id}.*");
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

    public async Task<bool> UploadImage(IFormFile file, int id)
    {
        try
        {
            var fileName = "NV_" + id + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(_uploadDirectory, fileName);

            await DeleteImage(id);

            using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            return true;
        }
        catch
        {
            return false;
        }
    }

    public async Task Lock(int id)
    {
        AdminUser user = await GetUserById(id);
        if (user != null)
        {
            user.FirebaseUid = null;
            user.Phone = null;
            user.Email = null;
            user.RoleId = 0;
            user.Avatar = null;
            user.IsActive = false;
            
            await DeleteImage(id);
            GetDbSet().Update(user);
        }
    }
}