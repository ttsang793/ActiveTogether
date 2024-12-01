using Core.DTO;
using Core.Entity;

namespace Core.Interface;

public interface IUserRepository : IUploadImage
{
    Task<int> Register(UserRegisterDTO user);

    Task<string> GetEmailByUsername(string username);

    Task<int> GetUserIdByUsername(string username);

    Task<User> GetUserByUsername(string username);

    Task<User> GetUserByFirebaseUid(string uid);

    Task UpdateInfo(UserUpdateInfoDTO user, string username);

    void GainPoint(int? userId, int? point);

    Task Lock(string username);
}