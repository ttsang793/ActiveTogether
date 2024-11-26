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

    public async Task<bool> Login(AdminLoginDTO admin)
    {
        var p = GetDbSet().FirstOrDefault(a => a.Id == admin.Id);
        return (p != null && admin.Password == p.Password);
    }

    public async Task<IEnumerable<AdminUser>> GetAllAdminUsers()
    {
        return await GetDbSet().Where(u => !u.FullName.Contains("Admin")).ToListAsync();
    }

    public AdminUser GetUserById(int id)
    {
        var user = GetDbSet().Where(u => u.Id == id).First();
        user.Password = "";
        return user;
    }

    public void UpdateInfo(UserUpdateInfoDTO user, int id)
    {
        var u = GetUserById(id);
        if (u != null)
        {
            u.Phone = user.Phone;
            u.Email = user.Email;
            u.Avatar = user.Avatar;
        }
        GetDbSet().Update(u);
    }

    public void UpdatePassword(UserUpdateDTO user, int id)
    {
        var u = GetDbSet().First(u => u.Id == id && u.Password == user.Old);
        if (u != null) u.Password = user.New!;
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

    public void Update(int id, int roleId)
    {
        var adminUser = GetUserById(id);
        adminUser.RoleId = roleId;
        GetDbSet().Update(adminUser);
    }

    public void Lock(int id)
    {
        AdminUser user = GetUserById(id);
        user.IsActive = false;
    }
}