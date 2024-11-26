using Core.Entity;
using System.Linq.Expressions;

namespace Core.Interface;
public interface IRolePermissionRepository
{
    Task<IEnumerable<Permission>> GelAllPermission();

    void ChangeRole(List<RolePermission> permissions);
}