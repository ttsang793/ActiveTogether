using System;
using System.Collections.Generic;

namespace cartservices.Models;

public partial class ProductReview
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public string Sku { get; set; } = null!;

    public int UserId { get; set; }

    public string Review { get; set; } = null!;

    public int Star { get; set; }

    public string? Respond { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual ProductDetail SkuNavigation { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
