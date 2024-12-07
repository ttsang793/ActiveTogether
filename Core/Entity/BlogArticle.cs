namespace Core.Entity;

public partial class BlogArticle : BaseEntity
{
    public string? Title { get; set; }

    public string? UrlName { get; set; }

    public string? Brief { get; set; }

    public string? Thumbnail { get; set; }

    public int? WrittenAdmin { get; set; }

    public string? Content { get; set; }

    public DateTime? DatePublish { get; set; }

    public bool? IsActive { get; set; }

    public virtual AdminUser? WrittenAdminNavigation { get; set; }
}
