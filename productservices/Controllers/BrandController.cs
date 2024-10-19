using Microsoft.AspNetCore.Mvc;
using productservices.Data;
using productservices.Models;

namespace productservices.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BrandController : ControllerBase
{
    private ILogger<BrandController> _logger;
    public BrandController(ILogger<BrandController> logger) {  _logger = logger; }
    private AtWebContext _dbContext = new AtWebContext();

    [HttpGet("All")]
    public IEnumerable<Brand> GetAllBrands()
    {
        return _dbContext.Brands.AsEnumerable().ToArray();
    }

    [HttpPost("Add")]
    public StatusCodeResult Add([Bind("Name")] Brand b)
    {
        if (ModelState.IsValid)
        {
            _dbContext.Brands.Add(new Brand { Name = b.Name });
            _dbContext.SaveChanges();
            return StatusCode(201);
        }
        else return StatusCode(500);
    }

    [HttpPost("Update")]
    public StatusCodeResult Update([Bind("Name")] Brand b, int id)
    {
        var brand = _dbContext.Brands.FirstOrDefault(b => b.Id == id);
        if (brand != null && ModelState.IsValid)
        {
            brand.Name = b.Name;
            _dbContext.SaveChanges();
            return StatusCode(201);
        }
        else return StatusCode(500);
    }

    [HttpPost("Delete")]
    public StatusCodeResult Delete(int id)
    {
        var brand = _dbContext.Brands.FirstOrDefault(b => b.Id == id);
        if (brand != null)
        {
            brand.IsActive = !brand.IsActive;
            _dbContext.SaveChanges();
            return StatusCode(201);
        }
        else return StatusCode(500);
    }
}
