using Application.Interface;
using Core.DTO;
using Core.Entity;
using Core.Interface;
using Microsoft.AspNetCore.Http;

namespace Application.Service;

public class AdminUserService : IAdminUserService
{
    private readonly IUnitOfWork _unitOfWork;

    public AdminUserService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<AdminUser> GetUserById(int id)
    {
        return await _unitOfWork.AdminUsers.GetUserById(id);
    }

	public async Task<bool> UpdateInfo(UserUpdateInfoDTO user, int id)
    {
        await _unitOfWork.AdminUsers.UpdateInfo(user, id);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> UploadImage(IFormFile file, int id)
    {
        return await _unitOfWork.AdminUsers.UploadImage(file, id);
    }

    public async Task<bool> UpdatePassword(UserUpdateDTO user, int id)
    {
        await _unitOfWork.AdminUsers.UpdatePassword(user, id);
        return await _unitOfWork.SaveChangesAsync();
    }
}
