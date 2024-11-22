using System;
using System.Collections.Generic;

namespace productservices.Models;

public partial class ImportDetail
{
    public int Id { get; set; }

    public int ImportId { get; set; }

    public string Sku { get; set; } = null!;

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }

    public virtual Import Import { get; set; } = null!;

    public virtual ProductDetail SkuNavigation { get; set; } = null!;
}
