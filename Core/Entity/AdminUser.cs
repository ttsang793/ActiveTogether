namespace Core.Entity;

public partial class AdminUser : BaseEntity
{

    public string? Password { get; set; }

    public string? FullName { get; set; }

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public int? RoleId { get; set; }

    public string? Avatar { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<BlogArticle> BlogArticles { get; set; } = new List<BlogArticle>();

    public virtual ICollection<Import> Imports { get; set; } = new List<Import>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Refund> Refunds { get; set; } = new List<Refund>();

    public virtual Role? Role { get; set; }
}
