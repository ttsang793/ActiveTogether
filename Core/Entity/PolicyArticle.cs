namespace Core.Entity;

public partial class PolicyArticle : BaseEntity
{
    public string? Title { get; set; }

    public string? UrlName { get; set; }

    public string? Content { get; set; }

    public DateTime? DatePublish { get; set; }

    public bool? IsActive { get; set; }
}
