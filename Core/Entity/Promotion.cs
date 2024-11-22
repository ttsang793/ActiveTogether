namespace Core.Entity;

public partial class Promotion : BaseEntity
{
    public string? Title { get; set; }

    public DateTime? DateStart { get; set; }

    public DateTime? DateEnd { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<PromotionDetail> PromotionDetails { get; set; } = new List<PromotionDetail>();
}
