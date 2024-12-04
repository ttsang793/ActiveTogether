using Core.Interface;
using Core.Entity;
using Core.DTO;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infrastructure.Repository;
public class RoleRepository : BaseRepository<Role>, IRoleRepository
{
    public RoleRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public async Task<IEnumerable<Role>> GetAllRoles(Expression<Func<Role, bool>> expression = null)
    {
        if (expression == null) return await GetDbSet().Include(r => r.RolePermissions).ToListAsync();
        return await GetDbSet().Include(r => r.RolePermissions).Where(expression).ToListAsync();
    }

    public async Task<Role> GetAllRolePermissionsById(int id)
    {
        return await GetDbSet().Include(rp => rp.RolePermissions).FirstAsync(r => r.Id == id);
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