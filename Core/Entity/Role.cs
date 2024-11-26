using System;
using System.Collections.Generic;

namespace Core.Entity;

public partial class Role : BaseEntity
{
    public string? Name { get; set; }

    public virtual ICollection<AdminUser> AdminUsers { get; set; } = new List<AdminUser>();

    public virtual ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
}
