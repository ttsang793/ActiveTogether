using Microsoft.AspNetCore.Mvc;
using productservices.Data;
using productservices.Models;

namespace productservices.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoryController : ControllerBase
{
    private ILogger<CategoryController> _logger;
    public CategoryController(ILogger<CategoryController> logger) { _logger = logger; }
    private AtWebContext _dbContext = new AtWebContext();

    [HttpGet("All")]
    public IEnumerable<Category> GetAllCategories()
    {
        return _dbContext.Categories.AsEnumerable().ToArray();
    }

    [HttpPost("Add")]
    public StatusCodeResult Add([Bind("Name")] Category c)
    {
        if (ModelState.IsValid)
        {
            _dbContext.Categories.Add(new Category { Name = c.Name });
            _dbContext.SaveChanges();
            return StatusCode(201);
        }
        else return StatusCode(500);
    }

    [HttpPost("Update")]
    public StatusCodeResult Update([Bind("Name")] Category c, int id)
    {
        var category = _dbContext.Categories.FirstOrDefault(c => c.Id == id);
        if (category != null && ModelState.IsValid)
        {
            category.Name = c.Name;
            _dbContext.SaveChanges();
            return StatusCode(201);
        }
        else return StatusCode(500);
    }

    [HttpPost("Delete")]
    public StatusCodeResult Delete(int id)
    {
        var category = _dbContext.Categories.FirstOrDefault(c => c.Id == id);
        if (category != null)
        {
            category.IsActive = !category.IsActive;
            _dbContext.SaveChanges();
            return StatusCode(201);
        }
        else return StatusCode(500);
    }
}