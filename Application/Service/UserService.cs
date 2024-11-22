using Application.Interface;
using Core.DTO;
using Core.Entity;
using Core.Interface;

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
        _unitOfWork.Users.Register(user);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> Login(UserLoginDTO user)
    {
        return await _unitOfWork.Users.Login(user);
    }

    public User GetUserByUsername(string username)
    {
        return _unitOfWork.Users.GetUserByUsername(username);
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