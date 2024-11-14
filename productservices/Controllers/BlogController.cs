using Microsoft.AspNetCore.Mvc;
using productservices.Data;
using productservices.Models;

namespace productservices.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BlogController : Controller
{
    private static int Id;
    private ILogger<BlogController> _logger;
    public BlogController(ILogger<BlogController> logger) { _logger = logger; }
    private readonly AtWebContext _dbContext = new AtWebContext();
    private readonly string _uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "..\\reactapp\\src\\img\\blog");

    [HttpGet("get")]
    public IEnumerable<BlogArticle> GetAllBlogs()
    {
        return _dbContext.BlogArticles.AsEnumerable().ToArray();
    }

    [HttpGet("get/content")]
    public BlogArticle GetContentById(int id)
    {
        return _dbContext.BlogArticles.First(b => b.Id == id);
    }

    [HttpPost("add")]
    public StatusCodeResult Add([Bind("Id", "Title", "Brief", "UrlName", "Thumbnail", "WrittenAdmin", "Content", "IsActive")] BlogArticle blog)
    {
        Id = _dbContext.BlogArticles.OrderByDescending(x => x.Id).First().Id;

        blog.Thumbnail = "/src/img/blog/thumbnail_" + Id + blog.Thumbnail;
        blog.DatePublish = DateTime.Now;
        _dbContext.BlogArticles.Add(blog);
        _dbContext.SaveChanges();
        return StatusCode(201);
    }

    [HttpPut("update")]
    public StatusCodeResult Update([Bind("Id", "Title", "Brief", "UrlName", "Thumbnail", "Content", "IsActive")] BlogArticle blog)
    {
        Id = blog.Id;

        var blogArticle = GetContentById(blog.Id);
        if (blog.Thumbnail != "")
            blog.Thumbnail = "/src/img/blog/thumbnail_" + Id + blog.Thumbnail;

        blogArticle.Title = blog.Title;
        blogArticle.Brief = blog.Brief;
        blogArticle.UrlName = blog.UrlName;
        blogArticle.Thumbnail = blog.Thumbnail;
        blogArticle.Content = blog.Content;

        _dbContext.SaveChanges();
        return StatusCode(201);
    }

    [HttpPost("uploadphoto")]
    public async Task<StatusCodeResult> UploadImage(IFormFile file)
    {
        try
        {
            var fileName = "thumbnail_" + Id + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(_uploadDirectory, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return StatusCode(201);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpPut("delete")]
    public StatusCodeResult Delete(int id)
    {
        var blogArticle = GetContentById(id);
        if (blogArticle != null)
        {
            blogArticle.IsActive = !blogArticle.IsActive;
            _dbContext.SaveChanges();
            return StatusCode(201);
        }
        else return StatusCode(500);
    }
}
