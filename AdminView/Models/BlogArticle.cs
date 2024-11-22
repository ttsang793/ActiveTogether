using System;
using System.Collections.Generic;

namespace productservices.Models;

public partial class BlogArticle
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string Brief { get; set; } = null!;

    public string UrlName { get; set; } = null!;

    public string? Thumbnail { get; set; }

    public int? WrittenAdmin { get; set; }

    public string? Content { get; set; }

    public bool IsActive { get; set; } = true;

    public DateTime? DatePublish { get; set; }

    public virtual AdminUser? WrittenAdminNavigation { get; set; }
}
