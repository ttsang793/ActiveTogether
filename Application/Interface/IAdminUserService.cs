using Core.Entity;
using Core.DTO;
using Microsoft.AspNetCore.Http;

namespace Application.Interface;

public interface IAdminUserService
{
	Task<AdminUser> GetUserById(int id);

	Task<AdminUser> GetUserByFirebaseUid(string uid);

	Task<bool> Update(UserUpdateInfoDTO user, int id);
	
	Task<bool> UploadImage(IFormFile file, int id);
}