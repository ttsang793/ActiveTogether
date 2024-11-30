using Core.DTO;
using Core.Entity;

namespace Core.Interface;

public interface IUserRepository : IUploadImage
{
    int Register(UserRegisterDTO user);

    Task<string> GetEmailByUsername(string username);

    int GetUserIdByUsername(string username);

    Task<User> GetUserByUsername(string username);

    Task<User> GetUserByFirebaseUid(string uid);

    void UpdateInfo(UserUpdateInfoDTO user, string username);

    void GainPoint(int? userId, int? point);
}