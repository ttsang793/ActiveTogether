using Core.Entity;
using System.Linq.Expressions;

namespace Core.Interface;
public interface IRoleRepository : IInsert<Role>, IUpdate<Role>
{
    Task<IEnumerable<Role>> GetAllRoles(Expression<Func<Role, bool>> expression = null);

    Task<Role> GetAllRolePermissionsById(int id);
}