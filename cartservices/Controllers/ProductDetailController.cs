using Microsoft.AspNetCore.Mvc;
using cartservices.Models;
using cartservices.DTO;
using cartservices.Data;

namespace cartservices.Controllers;

[Route("[controller]")]
[ApiController]
public class ProductDetailController : ControllerBase
{
    private ILogger<ProductDetailController> _logger;
    private AtWebContext _dbContext = new();

    public ProductDetailController(ILogger<ProductDetailController> logger) { _logger = logger; }

    [HttpGet("All")]
    public IEnumerable<ProductreadDTO> GetAllProducts()
    {
        var productList = (from pr in _dbContext.Productprices.ToList()
                           group pr by pr.ProductId into pg
                           join p in _dbContext.Products.ToList() on pg.Key equals p.Id
                           select new ProductreadDTO
                           {
                               Id = p.Id,
                               Name = p.Name,
                               UrlName = p.UrlName,
                               BrandId = p.BrandId,
                               CategoryId = p.CategoryId,
                               Gender = p.Gender,
                               Size = p.Size,
                               IsChildren = p.IsChildren,
                               Image = pg.First().Image,
                               Price = pg.Min(m => m.Price)
                           }).ToList();
        
        return productList;
    }

    [HttpGet("ByUrlName")]
    public IEnumerable<Productprice> GetProductByUrlName(string urlName)
    {
        var product = _dbContext.Products.First(p => p.UrlName == urlName)!;
        int id = product.Id;
        var selectionList = (from p in _dbContext.Productprices where (p.ProductId == id) select p).ToList();
        foreach (var s in selectionList) s.Product = product;
        return selectionList;
    }
}
