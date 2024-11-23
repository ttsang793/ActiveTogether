namespace Core.DTO;

public class ImportReadDTO : BaseDTO
{
    public int Id { get; set; }

    public DateTime? DateImport { get; set; }

    public int? CheckAdmin { get; set; }

    public string? AdminName { get; set; }

    public decimal? Total { get; set; }
}