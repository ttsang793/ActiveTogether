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

    [HttpGet("find")]
    public async Task<IEnumerable<Product>> GetAllProducts(string name)
    {
        return await _productService.GetAllProducts(p => p.Name.ToLower().Contains(name.ToLower()));
    }

    private async Task<string[]> DataValidation(ProductSaveAdminDTO productDTO, bool isUpdate)
    {
        bool errorFlag = false;
        string[] result = new string[5];
        if (string.IsNullOrEmpty(productDTO.Name))
        {
            errorFlag = true;
            result[0] = "Vui lòng nhập tên sản phẩm";
        }
        else if (!isUpdate && (await _productService.GetAllProducts(p => p.Name == productDTO.Name)).Any())
        {
            errorFlag = true;
            result[0] = "Tên sản phẩm không được trùng với các sản phẩm khác";
        }
        else if ((await _productService.GetAllProducts(p => p.Name == productDTO.Name && p.Id != productDTO.Id)).Any())
        {
            errorFlag = true;
            result[0] = "Tên sản phẩm không được trùng với các sản phẩm khác";
        }
            Console.WriteLine(productDTO.BrandId == -1);
        if (productDTO.BrandId == -1)
        {
            errorFlag = true;
            result[1] = "Vui lòng chọn thương hiệu";
        }
        if (productDTO.CategoryId == -1)
        {
            errorFlag = true;
            result[2] = "Vui lòng chọn danh mục";
        }
        if (productDTO.Gender == -1)
        {
            errorFlag = true;
            result[3] = "Vui lòng chọn giới tính";
        }
        if (productDTO.SportId.Length == 0)
        {
            errorFlag = true;
            result[4] = "Vui lòng chọn ít nhất 1 môn thể thao";
        }
        return errorFlag ? result : Array.Empty<string>();
    }

    [HttpPost("add")]
    public async Task<IActionResult> Insert([Bind("Id", "Name", "UrlName", "BrandId", "CategoryId", "Description", "Gender", "IsChildren", "SportId")]ProductSaveAdminDTO productDTO)
    {
        string[] validationResult = await DataValidation(productDTO, false);
        Console.WriteLine(validationResult.Length);
        if (validationResult.Length > 0) return BadRequest(new { errors = validationResult });

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
    public async Task<IActionResult> Update([Bind("Id", "Name", "UrlName", "BrandId", "CategoryId", "Description", "Gender", "IsChildren", "SportId")] ProductSaveAdminDTO productDTO)
    {
        string[] validationResult = await DataValidation(productDTO, true);
        if (validationResult.Length > 0) return BadRequest(new { errors = validationResult });

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