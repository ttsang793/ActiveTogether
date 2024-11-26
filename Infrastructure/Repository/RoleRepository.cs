using Core.Interface;
using Core.Entity;
using Core.DTO;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository;
public class RoleRepository : BaseRepository<Role>, IRoleRepository
{
    public RoleRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public async Task<IEnumerable<Role>> GetAllRoles()
    {
        return await GetDbSet().Include(r => r.RolePermissions).ToListAsync();
    }

    public async Task<Role> GetAllRolePermissionsById(int id)
    {
        return GetDbSet().Include(rp => rp.RolePermissions).First(r => r.Id == id);
    }

    public void Insert(Role role)
    {
        GetDbSet().Add(role);
    }

    public void Update(Role role)
    {
        GetDbSet().Update(role);
    }
}