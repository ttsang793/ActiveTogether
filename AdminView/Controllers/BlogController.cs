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

    [HttpGet("find")]
    public IEnumerable<BlogArticle> GetAllBlogs(string title)
    {
        return _blogService.GetAllBlogs(b => b.Title.ToLower().Contains(title.ToLower()));
    }

    [HttpGet("get/detail")]
    public BlogArticle GetBlogById(int id)
    {
        return _blogService.GetBlogById(id);
    }

    private string[] DataValidation(BlogArticle blog, bool isUpdate)
    {

        bool errorFlag = false;
        string[] result = new string[4];

        if (string.IsNullOrEmpty(blog.Title))
        {
            errorFlag = true;
            result[0] = "Vui lòng nhập tiêu đề bài blog";
        }
        else if (!isUpdate && _blogService.GetAllBlogs(b => b.UrlName == blog.UrlName).Any())
        {
            errorFlag = true;
            result[1] = "Tiêu đề bài blog không được trùng với các bài khác";
        }
        else if (_blogService.GetAllBlogs(b => b.UrlName == blog.UrlName && b.Id != blog.Id).Any())
        {
            errorFlag = true;
            result[1] = "Tiêu đề bài blog không được trùng với các bài khác";
        }
        if (blog.Thumbnail == null)
        {
            errorFlag = true;
            result[2] = "Vui lòng chọn hình tiêu đề cho bài blog (ưu tiên tỉ lệ 3:1)";
        }
        if (string.IsNullOrEmpty(blog.Title))
        {
            errorFlag = true;
            result[3] = "Vui lòng nhập nội dung cho bài viết";
        }
        return errorFlag ? result : Array.Empty<string>();
    }

    [HttpPost("add")]
    public async Task<IActionResult> Insert(BlogArticle blog)
    {
        string[] validationResult = DataValidation(blog, false);
        if (validationResult.Length > 0) return BadRequest(new { errors = validationResult });
        id = (GetAllBlogs().OrderByDescending(b => b.Id).First().Id + 1).ToString();
        blog.Thumbnail = "/src/images/blog/thumbnail_" + id + blog.Thumbnail;
        return (await _blogService.Insert(blog)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update(BlogArticle blog)
    {
        string[] validationResult = DataValidation(blog, true);
        if (validationResult.Length > 0) return BadRequest(new { errors = validationResult });
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
