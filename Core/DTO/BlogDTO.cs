namespace Core.DTO;

public class BlogReadDTO : BaseDTO
{
    public string? Title { get; set; }

    public string? Brief { get; set; }

    public string? UrlName { get; set; }

    public string? Thumbnail { get; set; }

    public string? Author { get; set; }

    public string? Avatar { get; set; }

    public DateTime? DatePublish { get; set; }
}

public class BlogDetailReadDTO : BaseDTO
{
    public string? Title { get; set; }

    public string? Brief { get; set; }

    public string? Author { get; set; }

    public string? Avatar { get; set; }

    public string? Content { get; set; }

    public DateTime? DatePublish { get; set; }
}