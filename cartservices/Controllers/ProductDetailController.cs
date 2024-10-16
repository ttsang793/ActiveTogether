using Microsoft.AspNetCore.Mvc;
using cartservices.Models;

namespace webapi.Controllers;

[Route("[controller]")]
[ApiController]
public class ProductDetailController : ControllerBase
{
    private ILogger<ProductDetailController> _logger;
    private AtWebContext _dbContext = new();

    public ProductDetailController(ILogger<ProductDetailController> logger) { _logger = logger; }

    [HttpGet]
    [Route("All")]
    public IEnumerable<Productprice> GetAllProducts()
    {
        List<Productprice> productList = new();
        for (int i=1; i<=_dbContext.Products.Count(); i++)
        {
            var product = _dbContext.Productprices.FirstOrDefault(p => p.ProductId == i);
            product.Product = _dbContext.Products.FirstOrDefault(p => p.Id == i);

            productList.Add(product);
        }
        return productList;
    }

    [HttpGet]
    [Route("ByUrlName")]
    public IEnumerable<Productprice> GetProductByUrlName(String urlName)
    {
        var product = _dbContext.Products.FirstOrDefault(p => p.UrlName == urlName)!;
        int id = product.Id;
        var selectionList = (from p in _dbContext.Productprices where (p.ProductId == id) select p).ToList();
        foreach (var s in selectionList) s.Product = product;
        return selectionList;
    }
}
