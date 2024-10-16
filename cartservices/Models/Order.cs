using System;
using System.Collections.Generic;

namespace cartservices.Models;

public partial class Order
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public decimal? Total { get; set; }

    public int? Point { get; set; }

    public DateTime? DatePurchased { get; set; }

    public DateTime? DateVertified { get; set; }

    public DateTime? DateReceived { get; set; }

    public int? VertifyAdmin { get; set; }

    public virtual ICollection<Orderdetail> Orderdetails { get; set; } = new List<Orderdetail>();

    public virtual User User { get; set; } = null!;

    public virtual Adminuser? VertifyAdminNavigation { get; set; }
}
