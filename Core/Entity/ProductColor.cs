namespace Core.Entity;

public partial class ProductColor : BaseEntity
{
    public int? ProductId { get; set; }

    public string? ColorCode { get; set; }

    public bool? IsActive { get; set; }

    public virtual Color? ColorCodeNavigation { get; set; }

    public virtual Product? Product { get; set; }

    public virtual ICollection<ProductDetail> ProductDetails { get; set; } = new List<ProductDetail>();

    public virtual ICollection<ProductImage> ProductImages { get; set; } = new List<ProductImage>();
}
