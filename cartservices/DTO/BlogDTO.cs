namespace cartservices.DTO;

public class BlogReadDTO
{
    public string Title { get; set; } = null!;

    public string Brief { get; set; } = null!;

    public string UrlName { get; set; } = null!;

    public string? Thumbnail { get; set; }

    public string? WrittenAdmin { get; set; }

    public DateTime? DatePublish { get; set; }
}

public class BlogDetailReadDTO
{
    public string Title { get; set; } = null!;

    public string Brief { get; set; } = null!;

    public string? WrittenAdmin { get; set; }

    public string? Content { get; set; }

    public DateTime? DatePublish { get; set; }
}