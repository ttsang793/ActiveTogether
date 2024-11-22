using System;
using System.Collections.Generic;

namespace productservices.Models;

public partial class ProductColor
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public string Color { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;

    public virtual ICollection<ProductDetail> ProductDetails { get; set; } = new List<ProductDetail>();

    public virtual ICollection<ProductImage> ProductImages { get; set; } = new List<ProductImage>();
}
