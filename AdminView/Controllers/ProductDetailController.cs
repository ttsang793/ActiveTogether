using Application.Interface;
using Core.Entity;
using Microsoft.AspNetCore.Mvc;

namespace AdminView.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductDetailController : ControllerBase
{
    private readonly ILogger<ProductDetailController> _logger;
    private readonly IProductDetailService _productDetailService;
    public ProductDetailController(ILogger<ProductDetailController> logger, IProductDetailService productDetailService)
    {
        _logger = logger;
        _productDetailService = productDetailService;
    }

    [HttpGet("get")]
    public IEnumerable<ProductDetail> GetProductDetailByColorId(int id)
    {
      return _productDetailService.GetProductDetailByColorId(id);
    }

    [HttpGet("get/image")]
    public IEnumerable<ProductImage> GetProductImagesByColorId(int id)
    {
        return _productDetailService.GetProductImagesByColorId(id);
    }

    /*
    [HttpPost("add")]
    public async Task<StatusCodeResult> Insert(ProductDetail productDetail)
    {
        return (await _productDetailService.Insert(productDetail)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("update")]
    public async Task<StatusCodeResult> Update(ProductDetail productDetail)
    {
        return (await _productDetailService.Update(productDetail)) ? StatusCode(200) : StatusCode(404);
    }
    */

    [HttpPut("lock")]
    public async Task<StatusCodeResult> Lock(string sku)
    {
        return (await _productDetailService.Lock(sku)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("unlock")]
    public async Task<StatusCodeResult> Unlock(string sku)
    {
        return (await _productDetailService.Unlock(sku)) ? StatusCode(200) : StatusCode(404);
    }
}