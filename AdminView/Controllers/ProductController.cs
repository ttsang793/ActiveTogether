using Microsoft.AspNetCore.Mvc;
using productservices.Models;
using productservices.Data;
using productservices.DTO;

namespace productservices.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private ILogger<ProductController> _logger;
    public ProductController(ILogger<ProductController> logger) { _logger = logger; }
    private readonly AtWebContext _dbContext = new AtWebContext();

    [HttpGet("get")]
    public IEnumerable<Product> GetAllProducts()
    {
        return _dbContext.Products.AsEnumerable().ToArray();
    }
    /*
    [HttpGet("")]
    public ProductreadDTO GetProductById(int id)
    {
        var p = _dbContext.Products.First(p => p.Id == id);
        var product = new ProductreadDTO
        {
            Id = p.Id,
            Name = p.Name,
            BrandId = p.BrandId,
            CategoryId = p.CategoryId,
            Description = p.Description,
            Size = p.Size,
            Gender = p.Gender,
            IsChildren = p.IsChildren
        };

        foreach (var s in _dbContext.Productsports.Where(p => p.ProductId == id))
            product.Sport.Add(s.SportId);
        return product;
    }

    [HttpGet("price")]
    public IEnumerable<Producte> GetPriceById(int id)
    {
        return _dbContext.Productprices.Where(p => p.ProductId == id).ToList();
    }

    [HttpPost("Add")]
    public StatusCodeResult Add([Bind("Name", "UrlName", "BrandId", "CategoryId", "Description",
        "Size", "Gender", "Productsports", "Productprices")]ProductDTO product)
    {
        if (ModelState.IsValid)
        {
            //Thêm sản phẩm
            Product addProduct = new Product
            {
                Name = product.Name,
                UrlName = product.UrlName,
                BrandId = product.BrandId,
                CategoryId = product.CategoryId,
                Description = product.Description,
                Size = product.Size,
                Gender = product.Gender
            };
            _dbContext.Add(addProduct);
            _dbContext.SaveChanges();

            int id = _dbContext.Products.OrderByDescending(p => p.Id).First().Id;

            //Thêm môn thể thao
            foreach (int s in product.Productsports)
            {
                var sport = new Productsport
                {
                    ProductId = id,
                    SportId = s
                };
                _dbContext.Productsports.Add(sport);
                _dbContext.SaveChanges();
            }

            //Thêm giá cả
            foreach (var p in product.Productprices)
            {
                var price = new Productprice
                {
                    ProductId = id,
                    Color = p.Color,
                    Image = p.Image,
                    Price = p.Price,
                    DateStart = DateTime.Now
                };
                _dbContext.Productprices.Add(price);
                _dbContext.SaveChanges();
            }

            return StatusCode(201);
        }
        return StatusCode(500);
    }*/

    [HttpPost("Delete")]
    public StatusCodeResult Delete(int id)
    {
        var product = _dbContext.Products.FirstOrDefault(p => p.Id == id);
        if (product != null)
        {
            product.IsActive = !product.IsActive;
            _dbContext.SaveChanges();
            return StatusCode(201);
        }
        else return StatusCode(500);
    }
}