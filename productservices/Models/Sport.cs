using System;
using System.Collections.Generic;

namespace productservices.Models;

public partial class Sport
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
