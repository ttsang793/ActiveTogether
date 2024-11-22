namespace Core.Entity;

public partial class Permission : BaseEntity
{
    public string? Name { get; set; }

    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();
}
