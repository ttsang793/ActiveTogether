using Core.Entity;
using Core.DTO;
using System.Linq.Expressions;

namespace Application.Interface;

public interface IPermissionService
{
	Task<IEnumerable<AdminUser>> GetAllAdminUsers(Expression<Func<AdminUser, bool>> expression = null);

	Task<bool> InsertAdmin(AdminUser adminUser);

	Task<bool> UpdateAdminRole(int id, int roleId);

    Task<bool> LockAdmin(int id);

	Task<IEnumerable<Role>> GetAllRoles(Expression<Func<Role, bool>> expression = null);

	Task<bool> InsertRole(Role role);

	Task<bool> UpdateRole(Role role);

	Task<Role> GetAllRolePermissionsById(int id);

	Task<IEnumerable<Permission>> GetAllPermission();
}