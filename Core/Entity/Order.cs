using System;
using System.Collections.Generic;

namespace Core.Entity;

public partial class Order : BaseEntity
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public string? FullName { get; set; }

    public string? Address { get; set; }

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public decimal? Total { get; set; }

    public int? Point { get; set; }

    public DateTime? DatePurchased { get; set; }

    public DateTime? DateVertified { get; set; }

    public DateTime? DateReceived { get; set; }

    public DateTime? DateCanceled { get; set; }

    public short? Status { get; set; }

    public int? VertifyAdmin { get; set; }

    public bool? IsPaid { get; set; }

    public string? PaymentMethod { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual User? User { get; set; }

    public virtual AdminUser? VertifyAdminNavigation { get; set; }
}
