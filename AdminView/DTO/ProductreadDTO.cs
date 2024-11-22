namespace productservices.DTO;
public class ProductreadDTO
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public int? BrandId { get; set; }

    public int? CategoryId { get; set; }

    public string? Description { get; set; }

    public string? Size { get; set; }

    public short? Gender { get; set; }

    public bool? IsChildren { get; set; }

    public List<int> Sport { get; set; } = new List<int>();
}
