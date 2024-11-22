namespace Core.DTO;

public class ProductReadDTO : BaseDTO
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Sku { get; set; }

    public string? UrlName { get; set; }

    public int? BrandId { get; set; }

    public int? CategoryId { get; set; }

    public short? Gender { get; set; }

    public bool? IsChildren { get; set; }

    public string? Image { get; set; }

    public decimal? Price { get; set; }

    public decimal? OldPrice { get; set; }

    public int? Quantity { get; set; }
}

public class ProductReviewReadDTO : BaseDTO
{
    public int Id { get; set; }

    public int? ProductId { get; set; }

    public string? Sku { get; set; }

    public string? Size { get; set; }

    public string? Color { get; set; }

    public int? UserId { get; set; }

    public string? Username { get; set; }

    public string? UserFullName { get; set; }

    public string? Review { get; set; }

    public short? Star { get; set; }

    public DateTime? DatePublish { get; set; }
}