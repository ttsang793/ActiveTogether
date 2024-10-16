using System;
using System.Collections.Generic;

namespace cartservices.Models;

public partial class Promotiondetail
{
    public int PromotionId { get; set; }

    public int ProductId { get; set; }

    public float? Percent { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual Promotion Promotion { get; set; } = null!;
}
