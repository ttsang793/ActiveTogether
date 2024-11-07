using System;
using System.Collections.Generic;

namespace productservices.Models;

public partial class ProductImage
{
    public int Id { get; set; }

    public int ProductColorId { get; set; }

    public string? Image { get; set; }

    public virtual ProductColor ProductColor { get; set; } = null!;
}
