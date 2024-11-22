namespace Core.Entity;

public partial class ImportDetail : BaseEntity
{
    public int? ImportId { get; set; }

    public string? Sku { get; set; }

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }

    public virtual Import? Import { get; set; }

    public virtual ProductDetail? SkuNavigation { get; set; }
}
