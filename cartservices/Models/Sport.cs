using System;
using System.Collections.Generic;

namespace cartservices.Models;

public partial class Sport
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public bool? IsActive { get; set; }

    public virtual ICollection<ProductSport> ProductSports { get; set; } = new List<ProductSport>();
}
