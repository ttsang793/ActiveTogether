using Application.Interface;
using Core.Entity;
using Microsoft.AspNetCore.Mvc;

namespace AdminView.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoryController : ControllerBase
{
    private readonly ILogger<CategoryController> _logger;
    private readonly ICategoryService _categoryService;
    public CategoryController(ILogger<CategoryController> logger, ICategoryService categoryService)
    {
        _logger = logger;
        _categoryService = categoryService;
    }

    [HttpGet("get")]
    public IEnumerable<Category> GetAllCaterories()
    {
        return _categoryService.GetAllCategories();
    }

    [HttpGet("find")]
    public IEnumerable<Category> GetAllCateroriesByName(string name)
    {
        return _categoryService.GetAllCategories(c => c.Name.ToLower().Contains(name.ToLower()));
    }
    
    [HttpPost("add")]
    public async Task<StatusCodeResult> Insert(Category category)
    {
        return (await _categoryService.Insert(category)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("update")]
    public async Task<StatusCodeResult> Update(Category category)
    {
        return (await _categoryService.Update(category)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("lock")]
    public async Task<StatusCodeResult> Lock(int id)
    {
        return (await _categoryService.Lock(id)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("unlock")]
    public async Task<StatusCodeResult> Unlock(int id)
    {
        return (await _categoryService.Unlock(id)) ? StatusCode(200) : StatusCode(404);
    }
}