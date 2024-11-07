using System;
using System.Collections.Generic;

namespace cartservices.Models;

public partial class PromotionDetail
{
    public int Id { get; set; }

    public int? PromotionId { get; set; }

    public int? ProductId { get; set; }

    public float? Percent { get; set; }

    public virtual Product? Product { get; set; }

    public virtual Promotion? Promotion { get; set; }
}
