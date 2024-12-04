namespace Core.Entity;

public partial class Permission : BaseEntity
{
    public string? Name { get; set; }

    public int? PermissionGroupId { get; set; }

    public virtual PermissionGroup? PermissionGroup { get; set; }

    public virtual ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
}
