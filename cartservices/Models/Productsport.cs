using System;
using System.Collections.Generic;

namespace cartservices.Models;

public partial class Productsport
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public int SportId { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual Sport Sport { get; set; } = null!;
}
