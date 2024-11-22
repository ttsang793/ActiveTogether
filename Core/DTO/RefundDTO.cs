namespace Core.DTO;

public class RefundRequestDTO : BaseDTO
{
    public int OrderDetailId { get; set; }

    public int? Quantity { get; set; }

    public decimal? Price { get; set; }

    public string? Reason { get; set; }
}
