using Core.Entity;
using System.Linq.Expressions;

namespace Core.Interface;
public interface IRoleRepository : IInsert<Role>, IUpdate<Role>
{
    Task<IEnumerable<Role>> GetAllRoles();

    Task<Role> GetAllRolePermissionsById(int id);
}