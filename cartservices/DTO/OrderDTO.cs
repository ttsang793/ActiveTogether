namespace cartservices.DTO;

public class OrderDTO
{
    public int? UserId { get; set; }

    public decimal? Total { get; set; }

    public virtual ICollection<OrderDetailDTO> OrderDetails { get; set; } = new List<OrderDetailDTO>();
}

public class OrderDetailDTO
{
    public string Sku { get; set; } = null!;

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }
}

public class OrderDetailReadDTO : CartDetailReadDTO
{
    public int Id { get; set; }
    public int OrderId { get; set; }

    public int? RefundStatus { get; set; } = -1;
}