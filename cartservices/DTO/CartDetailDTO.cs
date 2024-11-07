namespace cartservices.DTO;

public class CartDetailDTO
{
    public int UserId { get; set; }

    public string Sku { get; set; } = null!;

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }
}

public class CartDetailReadDTO : CartDetailDTO
{
    public string Name { get; set; } = null!;

    public string Color { get; set; } = null!;

    public string Size { get; set; } = null!;

    public string Image { get; set; } = null!;
}