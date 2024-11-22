namespace Core.Entity;

public partial class OrderDetail : BaseEntity
{
    public int? OrderId { get; set; }

    public string? Sku { get; set; }

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }

    public bool? IsReturn { get; set; }

    public virtual Order? Order { get; set; }

    public virtual ICollection<Refund> Refunds { get; set; } = new List<Refund>();

    public virtual ProductDetail? SkuNavigation { get; set; }
}
