using Application.Interface;
using Core.Entity;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;

namespace AdminView.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductColorController : ControllerBase
{
    private readonly ILogger<ProductColorController> _logger;
    private readonly IProductColorService _productColorService;
    public ProductColorController(ILogger<ProductColorController> logger, IProductColorService productColorService)
    {
        _logger = logger;
        _productColorService = productColorService;
    }

    [HttpGet("get")]
    public IEnumerable<ProductColor> GetProductColorByProductId(int id)
    {
        return _productColorService.GetProductColorByProductId(id);
    }

    [HttpPost("add")]
    public async Task<StatusCodeResult> Insert([Bind("ProductId", "ColorCode")]ProductColor productColor)
    {
        return (await _productColorService.Insert(productColor)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("update")]
    public async Task<StatusCodeResult> Update([Bind("Id", "ColorCode")] ProductColor productColor)
    {
        return (await _productColorService.Update(productColor)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("lock")]
    public async Task<StatusCodeResult> Lock(int id)
    {
        return (await _productColorService.Lock(id)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("unlock")]
    public async Task<StatusCodeResult> Unlock(int id)
    {
        return (await _productColorService.Unlock(id)) ? StatusCode(200) : StatusCode(404);
    }
}