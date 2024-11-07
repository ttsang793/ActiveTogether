using System;
using System.Collections.Generic;

namespace cartservices.Models;

public partial class OrderDetail
{
    public int Id { get; set; }

    public int OrderId { get; set; }

    public string Sku { get; set; } = null!;

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }

    public bool? IsReturn { get; set; }

    public virtual Order Order { get; set; } = null!;

    public virtual ICollection<Refund> Refunds { get; set; } = new List<Refund>();

    public virtual ProductDetail SkuNavigation { get; set; } = null!;
}
