using Core.DTO;
using Core.Entity;
using Microsoft.AspNetCore.Http;

namespace Application.Interface;

public interface IUserService
{
    Task<bool> Register(UserRegisterDTO user);

    Task<bool> Login(UserLoginDTO user);

    User GetUserByUsername(string username);

    int GetUserIdByUsername(string username);

    Task<bool> UploadImage(IFormFile file, string username);

    Task<bool> UpdateInfo(UserUpdateInfoDTO user, string username);

    Task<bool> UpdatePassword(UserUpdateDTO user, string username);
}