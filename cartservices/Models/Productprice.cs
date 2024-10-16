using System;
using System.Collections.Generic;

namespace cartservices.Models;

public partial class Productprice
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public string? Color { get; set; }

    public string Image { get; set; } = null!;

    public decimal Price { get; set; }

    public DateTime? DateStart { get; set; }

    public DateTime? DateEnd { get; set; }

    public virtual ICollection<Importdetail> Importdetails { get; set; } = new List<Importdetail>();

    public virtual ICollection<Orderdetail> Orderdetails { get; set; } = new List<Orderdetail>();

    public virtual Product Product { get; set; } = null!;
}
