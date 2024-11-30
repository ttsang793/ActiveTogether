using Application.Interface;
using Core.DTO;
using Core.Entity;
using Core.Interface;
using Microsoft.AspNetCore.Http;

namespace Application.Service;

public class UserService : IUserService
{
    private readonly IUnitOfWork _unitOfWork;

    public UserService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<bool> Register(UserRegisterDTO user)
    {
        int id =_unitOfWork.Users.Register(user);
        _unitOfWork.UserAddresses.CreateInitialAddress(new UserAddressListDTO { UserId = id, Address = user.Address! });
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<string> GetEmailByUsername(string username)
    {
        return await _unitOfWork.Users.GetEmailByUsername(username);
    }

    public async Task<bool> UploadImage(IFormFile file, string username)
    {
        return await _unitOfWork.Users.UploadImage(file, username);
    }

    public async Task<User> GetUserByUsername(string username)
    {
        return await _unitOfWork.Users.GetUserByUsername(username);
    }

    public async Task<User> GetUserByFirebaseUid(string uid)
    {
        return await _unitOfWork.Users.GetUserByFirebaseUid(uid);
    }

    public async Task<bool> UpdateInfo(UserUpdateInfoDTO user, string username)
    {
        _unitOfWork.Users.UpdateInfo(user, username);
        return await _unitOfWork.SaveChangesAsync();
    }
}