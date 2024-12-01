using Core.DTO;
using Core.Entity;

namespace Core.Interface;

public interface IUserAddressRepository
{
    Task<IEnumerable<UserAddress>> GetAddressByUserId(int id);

    Task UpdateAddressByUserId(UserAddressListDTO address, int id);

    Task DeleteAll(int id);

    Task CreateInitialAddress(UserAddressDTO address);
}