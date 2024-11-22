namespace Core.Entity;

public partial class Refund : BaseEntity
{
    public int? OrderDetailId { get; set; }

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }

    public short? Status { get; set; }

    public string? Reason { get; set; }

    public int? CheckAdmin { get; set; }

    public DateTime? DateRefund { get; set; }

    public virtual AdminUser? CheckAdminNavigation { get; set; }

    public virtual OrderDetail? OrderDetail { get; set; }
}
