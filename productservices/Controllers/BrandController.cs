using Microsoft.AspNetCore.Mvc;
using productservices.Models;

namespace productservices.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BrandController : ControllerBase
{
    private ILogger<BrandController> _logger;
    public BrandController(ILogger<BrandController> logger) {  _logger = logger; }
    private AtWebContext _dbContext = new AtWebContext();

    [HttpGet]
    [Route("All")]
    public IEnumerable<Brand> GetAllBrands()
    {
        return _dbContext.Brands.AsEnumerable().ToArray();
    }

    [HttpPost]
    [Route("Add")]
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

    [HttpPost]
    [Route("Update")]
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

    [HttpPost]
    [Route("Delete")]
    public StatusCodeResult Delete([Bind("Name")] Brand b, int id)
    {
        var brand = _dbContext.Brands.FirstOrDefault(b => b.Id == id);
        if (brand != null)
        {
            _dbContext.Remove(brand);
            _dbContext.SaveChanges();
            return StatusCode(201);
        }
        else return StatusCode(500);
    }
}
