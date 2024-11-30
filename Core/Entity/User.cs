namespace Core.Entity;

public partial class User : BaseEntity
{
    public string? FirebaseUid { get; set; }

    public string Username { get; set; } = null!;

    public string? FullName { get; set; }

    public DateTime? DateCreated { get; set; }

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public int? Point { get; set; }

    public string? Avatar { get; set; }

    public virtual ICollection<CartDetail> CartDetails { get; set; } = new List<CartDetail>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<ProductReview> ProductReviews { get; set; } = new List<ProductReview>();

    public virtual ICollection<UserAddress> UserAddresses { get; set; } = new List<UserAddress>();
}
