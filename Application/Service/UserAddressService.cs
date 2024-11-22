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

    public IEnumerable<UserAddress> GetAddressByUsername(string username)
    {
		return _unitOfWork.UserAddresses.GetAddressByUsername(username);
    }

    public async Task<bool> UpdateAddressByUsername(UserAddressDTO address, string username)
	{
		_unitOfWork.UserAddresses.UpdateAddressByUsername(address, username);
		return await _unitOfWork.SaveChangesAsync();
	}
}