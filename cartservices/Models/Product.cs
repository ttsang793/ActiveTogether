using System;
using System.Collections.Generic;

namespace cartservices.Models;

public partial class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string UrlName { get; set; } = null!;

    public int BrandId { get; set; }

    public int CategoryId { get; set; }

    public string? Description { get; set; }

    public short? Gender { get; set; }

    public bool? IsChildren { get; set; }

    public bool? IsActive { get; set; }

    public virtual Brand Brand { get; set; } = null!;

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<ProductColor> ProductColors { get; set; } = new List<ProductColor>();

    public virtual ICollection<ProductReview> ProductReviews { get; set; } = new List<ProductReview>();

    public virtual ICollection<ProductSport> ProductSports { get; set; } = new List<ProductSport>();

    public virtual ICollection<PromotionDetail> PromotionDetails { get; set; } = new List<PromotionDetail>();
}
