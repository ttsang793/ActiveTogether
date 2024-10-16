using System;
using System.Collections.Generic;

namespace productservices.Models;

public partial class Importdetail
{
    public int ImportId { get; set; }

    public int ProductpriceId { get; set; }

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }

    public virtual Import Import { get; set; } = null!;

    public virtual Productprice Productprice { get; set; } = null!;
}
