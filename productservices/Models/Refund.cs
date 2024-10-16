using System;
using System.Collections.Generic;

namespace productservices.Models;

public partial class Refund
{
    public int Id { get; set; }

    public DateTime? DateRefunded { get; set; }

    public int? VertifyAdmin { get; set; }

    public decimal? Total { get; set; }

    public virtual ICollection<Refunddetail> Refunddetails { get; set; } = new List<Refunddetail>();

    public virtual Adminuser? VertifyAdminNavigation { get; set; }
}
