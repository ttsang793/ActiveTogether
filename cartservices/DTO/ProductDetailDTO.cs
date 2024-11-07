namespace cartservices.DTO;

public class ProductDetailDTO
{
    public string Sku { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Image { get; set; } = null!;

    public string Color { get; set; } = null!;

    public string Size { get; set; } = null!;

    public decimal? Price { get; set; }

    public decimal? OldPrice { get; set; }

    public int? Quantity { get; set; } = 0;
}
