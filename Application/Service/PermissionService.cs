using Application.Interface;
using Core.Entity;
using Core.Interface;
using Core.DTO;

namespace Application.Service;

public class PermissionService : IPermissionService
{
	private readonly IUnitOfWork _unitOfWork;

	public PermissionService(IUnitOfWork unitOfWork)
	{
		_unitOfWork = unitOfWork;
	}

	public async Task<IEnumerable<AdminUser>> GetAllAdminUsers()
	{
		return await _unitOfWork.AdminUsers.GetAllAdminUsers();
	}

	public async Task<IEnumerable<Role>> GetAllRoles()
	{
		return await _unitOfWork.Roles.GetAllRoles();
	}

	public async Task<bool> InsertAdmin(AdminUser adminUser)
	{
		_unitOfWork.AdminUsers.Insert(adminUser);
		return await _unitOfWork.SaveChangesAsync();
	}

	public async Task<bool> UpdateAdminRole(int id, int roleId)
	{
		_unitOfWork.AdminUsers.Update(id, roleId);
		return await _unitOfWork.SaveChangesAsync();
	}

	public async Task<bool> LockAdmin(int id)
	{
		_unitOfWork.AdminUsers.Lock(id);
		return await _unitOfWork.SaveChangesAsync();
	}

	public async Task<bool> InsertRole(Role role)
	{
		_unitOfWork.Roles.Insert(role);
		_unitOfWork.RolePermissions.ChangeRole(role.RolePermissions.ToList());
		return await _unitOfWork.SaveChangesAsync();
	}

	public async Task<bool> UpdateRole(Role role)
	{
		_unitOfWork.Roles.Update(role);
		_unitOfWork.RolePermissions.ChangeRole(role.RolePermissions.ToList());
		return await _unitOfWork.SaveChangesAsync();
	}

	public async Task<Role> GetAllRolePermissionsById(int id)
	{
		return await _unitOfWork.Roles.GetAllRolePermissionsById(id);
	}

	public async Task<IEnumerable<Permission>> GelAllPermission()
	{
		return await _unitOfWork.RolePermissions.GelAllPermission();
	}
}