using Application.Interface;
using Core.DTO;
using Core.Entity;
using Core.Interface;

namespace Application.Service;

public class UserAddressService : IUserAddressService
{
    private readonly IUnitOfWork _unitOfWork;

    public UserAddressService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<UserAddress>> GetAddressByUsername(string username)
    {
        int id = await _unitOfWork.Users.GetUserIdByUsername(username);
		return await _unitOfWork.UserAddresses.GetAddressByUserId(id);
    }

    public async Task<bool> UpdateAddressByUsername(UserAddressListDTO address, string username)
    {
        int id = await _unitOfWork.Users.GetUserIdByUsername(username);
        await _unitOfWork.UserAddresses.UpdateAddressByUserId(address, id);
		return await _unitOfWork.SaveChangesAsync();
	}
}