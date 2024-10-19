namespace cartservices.DTO;
public class ProductreadDTO
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? UrlName { get; set; }

    public int? BrandId { get; set; }

    public int? CategoryId { get; set; }

    public short? Gender { get; set; }

    public string? Size { get; set; }

    public bool? IsChildren { get; set; }

    public string? Image { get; set; }

    public decimal? Price { get; set; }
}
