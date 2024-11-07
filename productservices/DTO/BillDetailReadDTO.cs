namespace productservices.DTO;

public class BillDetailReadDTO
{
    public int BillId { get; set; }

    public string Sku { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Color { get; set; }

    public string? Size { get; set; }

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }
}