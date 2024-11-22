using Core.DTO;
using Core.Entity;

namespace Core.Interface;

public interface IUserAddressRepository
{
    IEnumerable<UserAddress> GetAddressByUsername(string username);

    void UpdateAddressByUsername(UserAddressDTO address, string username);
}