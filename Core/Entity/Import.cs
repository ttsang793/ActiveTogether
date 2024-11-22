namespace Core.Entity;

public partial class Import : BaseEntity
{
    public DateTime? DateImport { get; set; }

    public int? CheckAdmin { get; set; }

    public decimal? Total { get; set; }

    public virtual AdminUser? CheckAdminNavigation { get; set; }

    public virtual ICollection<ImportDetail> ImportDetails { get; set; } = new List<ImportDetail>();
}
