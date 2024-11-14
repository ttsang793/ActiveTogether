using cartservices.Models;
using cartservices.Data;
using cartservices.DTO;
using Microsoft.AspNetCore.Mvc;

namespace cartservices.Controllers;

[Route("[controller]")]
[ApiController]
public class BlogController : ControllerBase
{
    private readonly ILogger<CartController> _logger;
    public BlogController(ILogger<CartController> logger) { _logger = logger; }
    private readonly AtWebContext _dbContext = new();

    [HttpGet("get/top3")]
    public IEnumerable<BlogReadDTO> GetTop3Blogs()
    {
        return (from b in _dbContext.BlogArticles
                join a in _dbContext.AdminUsers on b.WrittenAdmin equals a.Id
                where b.IsActive
                orderby b.Id descending
                select new BlogReadDTO
                {
                    Title = b.Title,
                    Brief = b.Brief,
                    UrlName = b.UrlName,
                    Thumbnail = b.Thumbnail,
                    WrittenAdmin = a.FullName,
                    DatePublish = b.DatePublish
                }).Take(2);
    }

    [HttpGet("get")]
    public IEnumerable<BlogReadDTO> GetAllBlogs()
    {
        return (from b in _dbContext.BlogArticles
                join a in _dbContext.AdminUsers on b.WrittenAdmin equals a.Id
                where b.IsActive
                orderby b.Id descending
                select new BlogReadDTO
                {
                    Title = b.Title,
                    Brief = b.Brief,
                    UrlName = b.UrlName,
                    Thumbnail = b.Thumbnail,
                    WrittenAdmin = a.FullName,
                    DatePublish = b.DatePublish
                }).ToList();
    }

    [HttpGet("get/detail")]
    public BlogDetailReadDTO GetBlogById(string urlName)
    {
        return (from b in _dbContext.BlogArticles
                join a in _dbContext.AdminUsers on b.WrittenAdmin equals a.Id
                where b.UrlName == urlName
                select new BlogDetailReadDTO
                {
                    Title = b.Title,
                    Brief = b.Brief,
                    Content = b.Content,
                    WrittenAdmin = a.FullName,
                    DatePublish = b.DatePublish
                }).First();
    }
}
