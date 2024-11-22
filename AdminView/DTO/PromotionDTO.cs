namespace productservices.DTO;

public class PromotionDTO
{
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime? DateStart { get; set; }

    public DateTime? DateEnd { get; set; }

    public virtual ICollection<PromotionDetailDTO> PromotionDetails { get; set; } = new List<PromotionDetailDTO>();
}

public class PromotionDetailDTO
{
    public int? ProductId { get; set; }

    public float? Percent { get; set; }
}