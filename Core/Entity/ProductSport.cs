namespace Core.Entity;

public partial class ProductSport : BaseEntity
{
    public int? ProductId { get; set; }

    public int? SportId { get; set; }

    public virtual Product? Product { get; set; }

    public virtual Sport? Sport { get; set; }
}
