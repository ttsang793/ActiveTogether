namespace Core.Entity;

public partial class Sport : BaseEntity
{
    public string? Name { get; set; }

    public string? Image { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<ProductSport> ProductSports { get; set; } = new List<ProductSport>();
}
