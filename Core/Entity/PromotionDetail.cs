namespace Core.Entity;

public partial class PromotionDetail : BaseEntity
{
    public int? PromotionId { get; set; }

    public int? ProductId { get; set; }

    public float? Percent { get; set; }

    public virtual Product? Product { get; set; }

    public virtual Promotion? Promotion { get; set; }
}
