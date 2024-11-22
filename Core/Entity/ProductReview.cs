namespace Core.Entity;

public partial class ProductReview : BaseEntity
{
    public int Id { get; set; }

    public int? ProductId { get; set; }

    public string? Sku { get; set; }

    public int? UserId { get; set; }

    public string? Review { get; set; }

    public short? Star { get; set; }

    public DateTime? DatePublish { get; set; }

    public virtual Product? Product { get; set; }

    public virtual ProductDetail? SkuNavigation { get; set; }

    public virtual User? User { get; set; }
}
