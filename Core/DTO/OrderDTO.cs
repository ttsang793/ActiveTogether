namespace Core.DTO;

public class OrderDTO : BaseDTO
{
    public string? Username { get; set; }

    public string? FullName { get; set; }

    public string? Address { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public decimal? Total { get; set; }

    public virtual ICollection<OrderDetailDTO> OrderDetails { get; set; } = new List<OrderDetailDTO>();
}

public class OrderDetailDTO : BaseDTO
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