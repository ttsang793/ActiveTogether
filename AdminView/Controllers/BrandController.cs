using Application.Interface;
using Core.Entity;
using Microsoft.AspNetCore.Mvc;

namespace AdminView.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BrandController : ControllerBase
{
    private readonly ILogger<BrandController> _logger;
    private readonly IBrandService _brandService;
    public BrandController(ILogger<BrandController> logger, IBrandService brandService)
    {
        _logger = logger;
        _brandService = brandService;
    }

    [HttpGet("get")]
    public IEnumerable<Brand> GetAllBrands()
    {
        return _brandService.GetAllBrands();
    }
    
    [HttpPost("add")]
    public async Task<StatusCodeResult> Insert(Brand brand)
    {
        return (await _brandService.Insert(brand)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("update")]
    public async Task<StatusCodeResult> Update(Brand brand)
    {
        return (await _brandService.Update(brand)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("lock")]
    public async Task<StatusCodeResult> Lock(int id)
    {
        return (await _brandService.Lock(id)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("unlock")]
    public async Task<StatusCodeResult> Unlock(int id)
    {
        return (await _brandService.Unlock(id)) ? StatusCode(200) : StatusCode(404);
    }
}