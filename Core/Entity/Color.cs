namespace Core.Entity;

public partial class Color : BaseEntity
{
    public string Code { get; set; } = null!;

    public string? Name { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<ProductColor> ProductColors { get; set; } = new List<ProductColor>();
}
