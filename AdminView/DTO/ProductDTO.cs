namespace productservices.DTO;

public class ProductDTO
{
    public string? Name { get; set; }

    public string? UrlName { get; set; }

    public int? BrandId { get; set; }

    public int? CategoryId { get; set; }

    public string? Description { get; set; }

    public string? Size { get; set; }

    public short? Gender { get; set; }
    
    public virtual List<int> Productsports { get; set; } = new List<int>();

    public virtual ICollection<ProductpriceDTO> Productprices { get; set; } = new List<ProductpriceDTO>();
}
