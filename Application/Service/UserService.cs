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

    public async Task<User> Login(UserLoginDTO user)
    {
        return await _unitOfWork.Users.Login(user);
    }

    public async Task<bool> UploadImage(IFormFile file, string username)
    {
        return await _unitOfWork.Users.UploadImage(file, username);
    }

    public User GetUserByUsername(string username)
    {
        return _unitOfWork.Users.GetUserByUsername(username);
    }

    public int GetUserIdByUsername(string username)
    {
        return _unitOfWork.Users.GetUserIdByUsername(username);
    }

    public async Task<bool> UpdateInfo(UserUpdateInfoDTO user, string username)
    {
        _unitOfWork.Users.UpdateInfo(user, username);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> UpdatePassword(UserUpdateDTO user, string username)
    {
        _unitOfWork.Users.UpdatePassword(user, username);
        return await _unitOfWork.SaveChangesAsync();
    }
}