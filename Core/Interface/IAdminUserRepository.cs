using Core.Entity;
using Core.DTO;
using Microsoft.AspNetCore.Http;
using System.Linq.Expressions;

namespace Core.Interface;
public interface IAdminUserRepository : IInsert<AdminUser>
{
    Task<IEnumerable<AdminUser>> GetAllAdminUsers(Expression<Func<AdminUser, bool>> expression = null);

    Task<AdminUser> GetUserById(int id);

    Task<AdminUser> GetUserByFirebaseUid(string uid);

    Task Update(int id, int roleId);

    Task Update(UserUpdateInfoDTO user, int id);

    Task<bool> UploadImage(IFormFile file, int id);

    Task Lock(int id);
}