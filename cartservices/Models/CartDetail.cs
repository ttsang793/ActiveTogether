using System;
using System.Collections.Generic;

namespace cartservices.Models;

public partial class CartDetail
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string Sku { get; set; } = null!;

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }

    public virtual ProductDetail SkuNavigation { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
