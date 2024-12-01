using Core.Interface;
using Core.Entity;
using Core.DTO;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository;
public class UserAddressRepository : BaseRepository<UserAddress>, IUserAddressRepository
{
    public UserAddressRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public async Task<IEnumerable<UserAddress>> GetAddressByUserId(int id)
    {
        return await GetDbSet().Where(u => u.UserId == id).ToListAsync();
    }

    public async Task UpdateAddressByUserId(UserAddressListDTO address, int id)
    {
        var oldUserAddresses = await GetAddressByUserId(id);
        GetDbSet().RemoveRange(oldUserAddresses);

        foreach (var a in address.AddressList)
            GetDbSet().Add(new UserAddress
            {
                UserId = a.UserId,
                Address = a.Address,
                Type = a.Type
            });
    }

    public async Task DeleteAll(int id)
    {
        var oldUserAddresses = await GetAddressByUserId(id);
        GetDbSet().RemoveRange(oldUserAddresses);
    }
    
    public async Task CreateInitialAddress(UserAddressDTO address)

    {
        GetDbSet().Add(new UserAddress
        {
            UserId = address.UserId,
            Address = address.Address,
            Type = "Mặc định"
        });
    }
}