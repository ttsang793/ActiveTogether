using Core.Entity;
using Core.DTO;
using Microsoft.AspNetCore.Http;

namespace Core.Interface;
public interface IAdminUserRepository : IInsert<AdminUser>
{
    Task<IEnumerable<AdminUser>> GetAllAdminUsers();

    AdminUser Login(UserLoginDTO user);

    Task<AdminUser> GetUserById(int id);

    Task<bool> Update(int id, int roleId);

    Task<bool> UpdateInfo(UserUpdateInfoDTO user, int id);

    Task<bool> UpdatePassword(UserUpdateDTO user, int id);

    Task<bool> UploadImage(IFormFile file, int id);

    Task<bool> Lock(int id);
}