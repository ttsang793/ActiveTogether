using System;
using System.Collections.Generic;

namespace productservices.Models;

public partial class Orderdetail
{
    public int Id { get; set; }

    public int OrderId { get; set; }

    public int ProductpriceId { get; set; }

    public int? Quantity { get; set; }

    public virtual Order Order { get; set; } = null!;

    public virtual Productprice Productprice { get; set; } = null!;

    public virtual ICollection<Refunddetail> Refunddetails { get; set; } = new List<Refunddetail>();
}
