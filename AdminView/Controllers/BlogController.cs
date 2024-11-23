using Application.Interface;
using Core.Entity;
using Microsoft.AspNetCore.Mvc;

namespace UserView.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BlogController : ControllerBase
{
    private readonly ILogger<BlogController> _logger;
    private readonly IBlogService _blogService;
    private static string id;

    public BlogController(ILogger<BlogController> logger, IBlogService blogService)
    {
        _logger = logger;
        _blogService = blogService;
    }

    [HttpGet("get")]
    public IEnumerable<BlogArticle> GetAllBlogs()
    {
        return _blogService.GetAllBlogs();
    }

    [HttpGet("get/detail")]
    public BlogArticle GetBlogById(int id)
    {
        return _blogService.GetBlogById(id);
    }

    [HttpPost("add")]
    public async Task<StatusCodeResult> Insert(BlogArticle blog)
    {
        id = (GetAllBlogs().OrderByDescending(b => b.Id).First().Id + 1).ToString();
        blog.Thumbnail = "/src/images/blog/thumbnail_" + id + blog.Thumbnail;
        return (await _blogService.Insert(blog)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("update")]
    public async Task<StatusCodeResult> Update(BlogArticle blog)
    {
        id = blog.Id.ToString();
        return (await _blogService.Update(blog)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPost("thumbnail/upload")]
    public async Task<StatusCodeResult> UploadImage(IFormFile file)
    {
        return (await _blogService.UploadImage(file, id)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("lock")]
    public async Task<StatusCodeResult> Lock(int id)
    {
        return (await _blogService.Lock(id)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("unlock")]
    public async Task<StatusCodeResult> Unlock(int id)
    {
        return (await _blogService.Unlock(id)) ? StatusCode(200) : StatusCode(404);
    }
}
