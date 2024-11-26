namespace Core.DTO;

public class PromotionAdminDTO : BaseDTO
{
    public int? Id { get; set; }

    public string? Title { get; set; }

    public string? DateStart { get; set; }

    public string? DateEnd { get; set; }
}
