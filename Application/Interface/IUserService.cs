using Core.DTO;
using Core.Entity;
using Microsoft.AspNetCore.Http;

namespace Application.Interface;

public interface IUserService
{
    Task<bool> Register(UserRegisterDTO user);

    Task<string> GetEmailByUsername(string username);

    Task<User> GetUserByUsername(string username);

    Task<User> GetUserByFirebaseUid(string uid);

    Task<bool> UploadImage(IFormFile file, string username);

    Task<bool> UpdateInfo(UserUpdateInfoDTO user, string username);

    Task<bool> Lock(string username);
}