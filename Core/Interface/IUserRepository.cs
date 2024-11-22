using Core.DTO;
using Core.Entity;

namespace Core.Interface;

public interface IUserRepository
{
    int Register(UserRegisterDTO user);

    Task<bool> Login(UserLoginDTO user);

    int GetUserIdByUsername(string username);

    User GetUserByUsername(string username);

    void UpdateInfo(UserUpdateInfoDTO user, string username);

    void UpdatePassword(UserUpdateDTO user, string username);

    void GainPoint(int? userId, int? point);
}