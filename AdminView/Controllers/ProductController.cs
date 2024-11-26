using Application.Interface;
using Core.Entity;
using Core.DTO;
using Microsoft.AspNetCore.Mvc;

namespace AdminView.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly ILogger<ProductController> _logger;
    private readonly IProductService _productService;
    public ProductController(ILogger<ProductController> logger, IProductService productService)
    {
        _logger = logger;
        _productService = productService;
    }

    [HttpGet("get")]
    public async Task<IEnumerable<Product>> GetAllProducts()
    {
        return await _productService.GetAllProducts();
    }

    [HttpPost("add")]
    public async Task<StatusCodeResult> Insert([Bind("Id", "Name", "UrlName", "BrandId", "CategoryId", "Description", "Gender", "IsChildren", "SportId")]ProductSaveAdminDTO productDTO)
    {
        var product = new Product
        {
            Id = productDTO.Id,
            Name = productDTO.Name,
            UrlName = productDTO.UrlName,
            BrandId = productDTO.BrandId,
            CategoryId = productDTO.CategoryId,
            Description = productDTO.Description,
            Gender = productDTO.Gender,
            IsChildren = productDTO.IsChildren
        };

        var productSports = new List<ProductSport>();

        foreach (var s in productDTO.SportId)
            productSports.Add(new ProductSport { ProductId = productDTO.Id, SportId = s });
        product.ProductSports = productSports;

        return (await _productService.Insert(product)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("update")]
    public async Task<StatusCodeResult> Update([Bind("Id", "Name", "UrlName", "BrandId", "CategoryId", "Description", "Gender", "IsChildren", "SportId")] ProductSaveAdminDTO productDTO)
    {
        var product = new Product
        {
            Id = productDTO.Id,
            Name = productDTO.Name,
            UrlName = productDTO.UrlName,
            BrandId = productDTO.BrandId,
            CategoryId = productDTO.CategoryId,
            Description = productDTO.Description,
            Gender = productDTO.Gender,
            IsChildren = productDTO.IsChildren
        };

        var productSports = new List<ProductSport>();

        foreach (var s in productDTO.SportId)
            productSports.Add(new ProductSport { ProductId = productDTO.Id, SportId = s });
        product.ProductSports = productSports;

        return (await _productService.Update(product)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("lock")]
    public async Task<StatusCodeResult> Lock(int id)
    {
        return (await _productService.Lock(id)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("unlock")]
    public async Task<StatusCodeResult> Unlock(int id)
    {
        return (await _productService.Unlock(id)) ? StatusCode(200) : StatusCode(404);
    }
}