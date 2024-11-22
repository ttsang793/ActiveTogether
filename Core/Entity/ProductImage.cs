namespace Core.Entity;

public partial class ProductImage : BaseEntity
{
    public int? ProductColorId { get; set; }

    public string? Image { get; set; }

    public virtual ProductColor? ProductColor { get; set; }
}
