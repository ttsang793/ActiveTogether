using System;
using System.Collections.Generic;

namespace cartservices.Models;

public partial class Product
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? UrlName { get; set; }

    public int? BrandId { get; set; }

    public int? CategoryId { get; set; }

    public int? Quantity { get; set; }

    public string? Description { get; set; }

    public string? Size { get; set; }

    public bool? Gender { get; set; }

    public bool? IsChildren { get; set; }

    public bool? IsActive { get; set; }

    public virtual Brand? Brand { get; set; }

    public virtual Category? Category { get; set; }

    public virtual ICollection<Productprice> Productprices { get; set; } = new List<Productprice>();

    public virtual ICollection<Productreview> Productreviews { get; set; } = new List<Productreview>();

    public virtual ICollection<Promotiondetail> Promotiondetails { get; set; } = new List<Promotiondetail>();

    public virtual ICollection<Sport> Sports { get; set; } = new List<Sport>();
}
