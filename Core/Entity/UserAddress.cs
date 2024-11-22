namespace Core.Entity;

public partial class UserAddress : BaseEntity
{
    public int? UserId { get; set; }

    public string? Type { get; set; }

    public string? Address { get; set; }

    public virtual User? User { get; set; }
}
