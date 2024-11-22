using Application.Interface;
using Core.DTO;
using Microsoft.AspNetCore.Mvc;

namespace UserView.Controllers;

[Route("[controller]")]
[ApiController]
public class BlogController : ControllerBase
{
    private readonly ILogger<BlogController> _logger;
    private readonly IBlogService _blogService;

    public BlogController(ILogger<BlogController> logger, IBlogService blogService)
    {
        _logger = logger;
        _blogService = blogService;
    }

    [HttpGet("get")]
    public async Task<IEnumerable<BlogReadDTO>> GetAllBlogs()
    {
        return await _blogService.GetAllBlogs();
    }

    [HttpGet("get/top3")]
    public async Task<IEnumerable<BlogReadDTO>> GetTop3Blogs()
    {
        return await _blogService.GetTop3Blogs();
    }

    [HttpGet("get/detail")]
    public async Task<BlogDetailReadDTO> GetByUrlAsync(string url)
    {
        return await _blogService.GetByUrlAsync(url);
    }
}
