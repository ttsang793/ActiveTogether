using System;
using System.Collections.Generic;

namespace cartservices.Models;

public partial class Refund
{
    public int Id { get; set; }

    public int OrderDetailId { get; set; }

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }

    public int? Status { get; set; }

    public string? Reason { get; set; }

    public int? CheckAdmin { get; set; }

    public DateTime? DateRefund { get; set; }

    public virtual AdminUser? CheckAdminNavigation { get; set; }

    public virtual OrderDetail OrderDetail { get; set; } = null!;
}
