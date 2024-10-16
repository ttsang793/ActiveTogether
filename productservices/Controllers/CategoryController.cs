using Microsoft.AspNetCore.Mvc;
using productservices.Models;

namespace productservices.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoryController : ControllerBase
{
    private ILogger<CategoryController> _logger;
    public CategoryController(ILogger<CategoryController> logger) { _logger = logger; }
    private AtWebContext _dbContext = new AtWebContext();

    [HttpGet]
    [Route("All")]
    public IEnumerable<Category> GetAllCategories()
    {
        return _dbContext.Categories.AsEnumerable().ToArray();
    }

    [HttpPost]
    [Route("Add")]
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

    [HttpPost]
    [Route("Update")]
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

    [HttpPost]
    [Route("Delete")]
    public StatusCodeResult Delete(int id)
    {
        var category = _dbContext.Categories.FirstOrDefault(c => c.Id == id);
        if (category != null)
        {
            _dbContext.Remove(category);
            _dbContext.SaveChanges();
            return StatusCode(201);
        }
        else return StatusCode(500);
    }
}