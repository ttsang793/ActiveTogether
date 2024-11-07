namespace cartservices.DTO;

public class ProductReadDTO
{
    public int Id { get; set; }

    public string? Name { get; set; }

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