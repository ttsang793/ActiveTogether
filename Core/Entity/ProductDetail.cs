namespace Core.Entity;

public partial class ProductDetail : BaseEntity
{
    public string Sku { get; set; } = null!;

    public int? ProductColorId { get; set; }

    public string? Size { get; set; }

    public decimal? Price { get; set; }

    public decimal? OldPrice { get; set; }

    public int? Quantity { get; set; }

    public string? Note { get; set; }

    public DateTime? DateStart { get; set; }

    public DateTime? DateEnd { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<CartDetail> CartDetails { get; set; } = new List<CartDetail>();

    public virtual ICollection<ImportDetail> ImportDetails { get; set; } = new List<ImportDetail>();

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ProductColor? ProductColor { get; set; }

    public virtual ICollection<ProductReview> ProductReviews { get; set; } = new List<ProductReview>();
}
