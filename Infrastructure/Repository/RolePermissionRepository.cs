using Core.Interface;
using Core.Entity;
using Core.DTO;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository;
public class RolePermissionRepository : BaseRepository<RolePermission>, IRolePermissionRepository
{
    public RolePermissionRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public async Task<IEnumerable<Permission>> GelAllPermission()
    {
        return await GetDbContext().Permissions.ToListAsync();
    }

    public void ChangeRole(List<RolePermission> permissions)
    {
        GetDbSet().RemoveRange(GetDbSet().Where(p => p.RoleId == permissions[0].RoleId));

        GetDbSet().AddRange(permissions);
    }
}