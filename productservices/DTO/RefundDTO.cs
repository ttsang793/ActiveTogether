namespace productservices.DTO;

public class RefundReadDTO
{
    public int OrderId { get; set; }

    public int OrderDetailId { get; set; }

    public string? Sku { get; set; }

    public string? Name { get; set; }

    public string? Color { get; set; }

    public string? Size { get; set; }

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }

    public string? Reason { get; set; }

    public int? Status { get; set; }
}

public class RefundUpdateDTO
{
    public int OrderId { get; set; }

    public int OrderDetailId { get; set; }

    public string Sku { get; set; }

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }

    public int? Status { get; set; }

    public int VertifyAdmin { get; set; }
}