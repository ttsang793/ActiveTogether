using productservices.Models;

namespace productservices.DTO;

public class OrderReadDTO
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

    public OrderReadDTO() { }

    public OrderReadDTO(Order o, string? adminName)
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

public class OrderVertifyDTO
{
    public int Id { get; set; }

    public int? VertifyAdmin { get; set; }

    public short? Status { get; set; }
}