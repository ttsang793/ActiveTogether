using System;
using System.Collections.Generic;

namespace cartservices.Models;

public partial class Sport
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<Productsport> Productsports { get; set; } = new List<Productsport>();
}
