using System;
using System.Collections.Generic;

namespace productservices.Models;

public partial class Promotion
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public DateTime? DateStart { get; set; }

    public DateTime? DateEnd { get; set; }

    public virtual ICollection<Promotiondetail> Promotiondetails { get; set; } = new List<Promotiondetail>();
}
