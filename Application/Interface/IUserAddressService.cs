using Core.DTO;
using Core.Entity;

namespace Application.Interface;

public interface IUserAddressService
{
    Task<IEnumerable<UserAddress>> GetAddressByUsername(string username);

    Task<bool> UpdateAddressByUsername(UserAddressListDTO address, string username);
}