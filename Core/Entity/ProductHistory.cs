namespace Core.Entity;

public partial class ProductHistory : BaseEntity
{
    public string Username { get; set; } = null!;

    public int ProductId { get; set; }

    public string UrlName { get; set; } = null!;

    public DateTime? Timestamp { get; set; }

    public virtual Product? Product { get; set; } = null!;

    public virtual User? UsernameNavigation { get; set; } = null!;
}
