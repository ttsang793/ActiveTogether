using System;
using System.Collections.Generic;

namespace cartservices.Models;

public partial class Refunddetail
{
    public int OrderdetailId { get; set; }

    public int RefundId { get; set; }

    public int? Quantity { get; set; }

    public virtual Orderdetail Orderdetail { get; set; } = null!;

    public virtual Refund Refund { get; set; } = null!;
}
