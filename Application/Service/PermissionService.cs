using Application.Interface;
using Core.Entity;
using Core.Interface;
using Core.DTO;
using System.Linq.Expressions;

namespace Application.Service;

public class PermissionService : IPermissionService
{
	private readonly IUnitOfWork _unitOfWork;

	public PermissionService(IUnitOfWork unitOfWork)
	{
		_unitOfWork = unitOfWork;
	}

	public async Task<IEnumerable<AdminUser>> GetAllAdminUsers(Expression<Func<AdminUser, bool>> expression = null)
	{
		return await _unitOfWork.AdminUsers.GetAllAdminUsers(expression);
	}

	public async Task<bool> InsertAdmin(AdminUser adminUser)
	{
		_unitOfWork.AdminUsers.Insert(adminUser);
		return await _unitOfWork.SaveChangesAsync();
	}

	public async Task<bool> UpdateAdminRole(int id, int roleId)
	{
		await _unitOfWork.AdminUsers.Update(id, roleId);
		return await _unitOfWork.SaveChangesAsync();
	}

	public async Task<bool> LockAdmin(int id)
	{
        await _unitOfWork.AdminUsers.Lock(id);
		return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<IEnumerable<Role>> GetAllRoles(Expression<Func<Role, bool>> expression = null)
    {
        return await _unitOfWork.Roles.GetAllRoles(expression);
    }

    public async Task<Role> GetAllRolePermissionsById(int id)
    {
        return await _unitOfWork.Roles.GetAllRolePermissionsById(id);
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

	public async Task<IEnumerable<Permission>> GetAllPermission()
	{
		return await _unitOfWork.RolePermissions.GetAllPermission();
	}
}