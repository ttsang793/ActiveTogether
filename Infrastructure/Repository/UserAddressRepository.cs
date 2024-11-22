using Core.Interface;
using Core.Entity;
using Core.DTO;
using Infrastructure.Data;

namespace Infrastructure.Repository;
public class UserAddressRepository : BaseRepository<UserAddress>, IUserAddressRepository
{
    public UserAddressRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public IEnumerable<UserAddress> GetAddressByUsername(string username)
    {
        return (from ua in GetDbSet()
                join u in GetDbContext().Users on ua.UserId equals u.Id
                where u.Username == username
                select ua);
    }

    public void UpdateAddressByUsername(UserAddressDTO address, string username)
    {
        var oldUserAddresses = GetAddressByUsername(username);
        GetDbSet().RemoveRange(oldUserAddresses);

        foreach (var a in address.AddressList)
            GetDbSet().Add(new UserAddress
            {
                UserId = a.UserId,
                Address = a.Address,
                Type = a.Type
            });
    }
}