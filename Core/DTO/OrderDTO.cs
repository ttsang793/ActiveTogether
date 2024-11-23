using Core.Entity;

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

public class OrderAdminDTO : BaseDTO
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public decimal? Total { get; set; }

    public int? Point { get; set; }

    public DateTime? DatePurchased { get; set; }

    public DateTime? DateVertified { get; set; }

    public DateTime? DateReceived { get; set; }

    public short? Status { get; set; }

    public int? VertifyAdmin { get; set; }

    public string? VertifyAdminName { get; set; }

    public OrderAdminDTO() { }

    public OrderAdminDTO(Order o, string? adminName)
    {
        Id = o.Id;
        UserId = o.UserId;
        Total = o.Total;
        Point = o.Point;
        DatePurchased = o.DatePurchased;
        DateVertified = o.DateVertified;
        DateReceived = o.DateReceived;
        Status = o.Status;
        VertifyAdmin = o.VertifyAdmin;
        VertifyAdminName = adminName;
    }
}

public class OrderVertifyDTO : BaseDTO
{
    public int Id { get; set; }

    public int? VertifyAdmin { get; set; }

    public sbyte? Status { get; set; }
}

public class BillDetailAdminDTO : BaseDTO
{
    public int BillId { get; set; }

    public string Sku { get; set; } = null!;

    public string? Name { get; set; }

    public string? Color { get; set; }

    public string? Size { get; set; }

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }
}