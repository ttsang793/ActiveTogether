using Core.Interface;
using Core.Entity;
using Core.DTO;
using Infrastructure.Data;

namespace Infrastructure.Repository;
public class UserRepository : BaseRepository<User>, IUserRepository
{
    public UserRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public void Register(UserRegisterDTO user)
    {
        GetDbSet().Add(new User
        {
            Username = user.Username,
            Password = user.Password,
            Email = user.Email,
            Phone = user.Phone,
            Point = 0,
            DateCreated = DateTime.Now
        });
    }

    public async Task<bool> Login(UserLoginDTO user)
    {
        var p = GetDbSet().FirstOrDefault(u => u.Username == user.Username);
        return (p != null && user.Password == p.Password);
    }

    public int GetUserIdByUsername(string username)
    {
        return GetDbSet().First(u => u.Username == username).Id;
    }

    public User GetUserByUsername(string username)
    {
        var user = GetDbSet().Where(u => u.Username == username).First();
        user.Password = "";
        user.Id = 0;
        return user;
    }

    public void UpdateInfo(UserUpdateInfoDTO user, string username)
    {
        var u = GetDbSet().First(u => u.Username == username);
        if (u != null)
        {
            u.FullName = user.FullName;
            u.Phone = user.Phone;
            u.Email = user.Email;
        }
    }

    public void UpdatePassword(UserUpdateDTO user, string username)
    {
        var u = GetDbSet().First(u => u.Username == username && u.Password == user.Old);
        if (u != null) u.Password = user.New!;
    }

    public void GainPoint(int? userId, int? point)
    {
        var u = GetDbSet().First(u => u.Id == userId);
        u.Point += point;
    }
}