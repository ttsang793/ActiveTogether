namespace Core.DTO;

public class CartDetailDTO : BaseDTO
{
    public string Username { get; set; } = null!;

    public string Sku { get; set; } = null!;

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }
}

public class CartDetailReadDTO : CartDetailDTO
{
    public string? Name { get; set; }

    public string? Color { get; set; }

    public string? Size { get; set; }

    public string? Image { get; set; }
}