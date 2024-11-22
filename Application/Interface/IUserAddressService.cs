using Core.DTO;
using Core.Entity;

namespace Application.Interface;

public interface IUserAddressService
{
    IEnumerable<UserAddress> GetAddressByUsername(string username);

    Task<bool> UpdateAddressByUsername(UserAddressDTO address, string username);
}