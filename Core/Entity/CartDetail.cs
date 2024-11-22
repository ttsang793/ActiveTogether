namespace Core.Entity;

public partial class CartDetail : BaseEntity
{

    public int? UserId { get; set; }

    public string? Sku { get; set; }

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }

    public virtual ProductDetail? SkuNavigation { get; set; }

    public virtual User? User { get; set; }
}
