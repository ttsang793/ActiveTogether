using Core.Entity;
using Core.DTO;
using Microsoft.AspNetCore.Http;

namespace Application.Interface;

public interface IAdminUserService
{
	AdminUser GetUserById(int id);

	Task<bool> UpdateInfo(UserUpdateInfoDTO user, int id);

    Task<bool> UploadImage(IFormFile file, int id);


    Task<bool> UpdatePassword(UserUpdateDTO user, int id);
}