namespace productservices.DTO;

public class ImportDTO
{
    public readonly int CheckAdmin = 240523;

    public decimal? Total { get; set; }

    public virtual ICollection<ImportDetailDTO> ImportDetails { get; set; } = new List<ImportDetailDTO>();
}

public class ImportDetailDTO
{
    public string Sku { get; set; } = null!;

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }
}

public class ImportReadDTO
{
    public int Id { get; set; }

    public DateTime? DateImport { get; set; }

    public int? CheckAdmin { get; set; }

    public string? AdminName { get; set; }

    public decimal? Total { get; set; }
}