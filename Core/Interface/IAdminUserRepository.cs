using Core.Entity;
using Core.DTO;
using Microsoft.AspNetCore.Http;

namespace Core.Interface;
public interface IAdminUserRepository : IInsert<AdminUser>, ILock
{
    Task<IEnumerable<AdminUser>> GetAllAdminUsers();

    AdminUser GetUserById(int id);

    void Update(int id, int roleId);

    void UpdateInfo(UserUpdateInfoDTO user, int id);

    void UpdatePassword(UserUpdateDTO user, int id);

    Task<bool> UploadImage(IFormFile file, int id);
}