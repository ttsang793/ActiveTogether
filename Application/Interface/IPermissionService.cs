using Core.Entity;
using Core.DTO;

namespace Application.Interface;

public interface IPermissionService
{
	Task<IEnumerable<AdminUser>> GetAllAdminUsers();

	Task<IEnumerable<Role>> GetAllRoles();

	Task<bool> InsertAdmin(AdminUser adminUser);

	Task<bool> UpdateAdminRole(int id, int roleId);

    Task<bool> LockAdmin(int id);

	Task<bool> InsertRole(Role role);

	Task<bool> UpdateRole(Role role);

	Task<Role> GetAllRolePermissionsById(int id);

	Task<IEnumerable<Permission>> GelAllPermission();
}