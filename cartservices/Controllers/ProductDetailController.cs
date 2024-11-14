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

    private IEnumerable<ProductReadDTO> GetAllProductsDefault()
    {
        var productList = (from p in _dbContext.Products
                           join c in _dbContext.ProductColors on p.Id equals c.ProductId
                           join i in _dbContext.ProductImages on c.Id equals i.ProductColorId
                           join d in _dbContext.ProductDetails on c.Id equals d.ProductColorId
                           where i.Image!.Contains("-1.")
                           group new { p, c, i, d } by p.Id into g
                           select new ProductReadDTO
                           {
                               Id = g.Key,
                               Name = g.Select(x => x.p.Name).First(),
                               UrlName = g.Select(x => x.p.UrlName).First(),
                               BrandId = g.Select(x => x.p.BrandId).First(),
                               CategoryId = g.Select(x => x.p.CategoryId).First(),
                               Gender = g.Select(x => x.p.Gender).First(),
                               IsChildren = g.Select(x => x.p.IsChildren).First(),
                               Image = g.Select(x => x.i.Image).First(),
                               Price = g.Select(x => x.d.Price).First(),
                               OldPrice = g.Select(x => x.d.OldPrice).First(),
                               Quantity = g.Sum(x => x.d.Quantity)
                           }).ToList();

        return productList;
    }

    private IEnumerable<ProductReadDTO> GetAllProductsPriceAsc()
    {

        var productList = (from p in _dbContext.Products
                           join c in _dbContext.ProductColors on p.Id equals c.ProductId
                           join i in _dbContext.ProductImages on c.Id equals i.ProductColorId
                           join d in _dbContext.ProductDetails on c.Id equals d.ProductColorId
                           where i.Image!.Contains("-1.")
                           group new { p, c, i, d } by p.Id into g
                           orderby g.Select(x => x.d.Price).FirstOrDefault()
                           select new ProductReadDTO
                           {
                               Id = g.Key,
                               Name = g.Select(x => x.p.Name).First(),
                               UrlName = g.Select(x => x.p.UrlName).First(),
                               BrandId = g.Select(x => x.p.BrandId).First(),
                               CategoryId = g.Select(x => x.p.CategoryId).First(),
                               Gender = g.Select(x => x.p.Gender).First(),
                               IsChildren = g.Select(x => x.p.IsChildren).First(),
                               Image = g.Select(x => x.i.Image).First(),
                               Price = g.Select(x => x.d.Price).First(),
                               OldPrice = g.Select(x => x.d.OldPrice).First(),
                               Quantity = g.Sum(x => x.d.Quantity)
                           }).ToList();

        return productList;
    }

    private IEnumerable<ProductReadDTO> GetAllProductsPriceDesc()
    {

        var productList = (from p in _dbContext.Products
                           join c in _dbContext.ProductColors on p.Id equals c.ProductId
                           join i in _dbContext.ProductImages on c.Id equals i.ProductColorId
                           join d in _dbContext.ProductDetails on c.Id equals d.ProductColorId
                           where i.Image!.Contains("-1.")
                           group new { p, c, i, d } by p.Id into g
                           orderby g.Select(x => x.d.Price).FirstOrDefault() descending
                           select new ProductReadDTO
                           {
                               Id = g.Key,
                               Name = g.Select(x => x.p.Name).First(),
                               UrlName = g.Select(x => x.p.UrlName).First(),
                               BrandId = g.Select(x => x.p.BrandId).First(),
                               CategoryId = g.Select(x => x.p.CategoryId).First(),
                               Gender = g.Select(x => x.p.Gender).First(),
                               IsChildren = g.Select(x => x.p.IsChildren).First(),
                               Image = g.Select(x => x.i.Image).First(),
                               Price = g.Select(x => x.d.Price).First(),
                               OldPrice = g.Select(x => x.d.OldPrice).First(),
                               Quantity = g.Sum(x => x.d.Quantity)
                           }).ToList();

        return productList;
    }

    private IEnumerable<ProductReadDTO> GetAllProductsNameAsc()
    {

        var productList = (from p in _dbContext.Products
                           join c in _dbContext.ProductColors on p.Id equals c.ProductId
                           join i in _dbContext.ProductImages on c.Id equals i.ProductColorId
                           join d in _dbContext.ProductDetails on c.Id equals d.ProductColorId
                           where i.Image!.Contains("-1.")
                           group new { p, c, i, d } by p.Id into g
                           orderby g.Select(x => x.p.Name).FirstOrDefault()
                           select new ProductReadDTO
                           {
                               Id = g.Key,
                               Name = g.Select(x => x.p.Name).First(),
                               UrlName = g.Select(x => x.p.UrlName).First(),
                               BrandId = g.Select(x => x.p.BrandId).First(),
                               CategoryId = g.Select(x => x.p.CategoryId).First(),
                               Gender = g.Select(x => x.p.Gender).First(),
                               IsChildren = g.Select(x => x.p.IsChildren).First(),
                               Image = g.Select(x => x.i.Image).First(),
                               Price = g.Select(x => x.d.Price).First(),
                               OldPrice = g.Select(x => x.d.OldPrice).First(),
                               Quantity = g.Sum(x => x.d.Quantity)
                           }).ToList();

        return productList;
    }

    private IEnumerable<ProductReadDTO> GetAllProductsNameDesc()
    {

        var productList = (from p in _dbContext.Products
                           join c in _dbContext.ProductColors on p.Id equals c.ProductId
                           join i in _dbContext.ProductImages on c.Id equals i.ProductColorId
                           join d in _dbContext.ProductDetails on c.Id equals d.ProductColorId
                           where i.Image!.Contains("-1.")
                           group new { p, c, i, d } by p.Id into g
                           orderby g.Select(x => x.p.Name).FirstOrDefault() descending
                           select new ProductReadDTO
                           {
                               Id = g.Key,
                               Name = g.Select(x => x.p.Name).First(),
                               UrlName = g.Select(x => x.p.UrlName).First(),
                               BrandId = g.Select(x => x.p.BrandId).First(),
                               CategoryId = g.Select(x => x.p.CategoryId).First(),
                               Gender = g.Select(x => x.p.Gender).First(),
                               IsChildren = g.Select(x => x.p.IsChildren).First(),
                               Image = g.Select(x => x.i.Image).First(),
                               Price = g.Select(x => x.d.Price).First(),
                               OldPrice = g.Select(x => x.d.OldPrice).First(),
                               Quantity = g.Sum(x => x.d.Quantity)
                           }).ToList();

        return productList;
    }

    [HttpGet("get")]
    public IEnumerable<ProductReadDTO> GetAllProducts(int sort)
    {
        return sort switch
        {
            0 => GetAllProductsDefault(),
            1 => GetAllProductsPriceAsc(),
            2 => GetAllProductsPriceDesc(),
            3 => GetAllProductsNameAsc(),
            4 => GetAllProductsNameDesc(),
            _ => new List<ProductReadDTO>(),
        };
    }

    [HttpGet("filter")]
    public List<FilterDTO> GetAllFilter()
    {
        List<FilterDTO> filters = new List<FilterDTO>();
        string[] brand = (from b in _dbContext.Brands select b.Name).ToArray();
        filters.Add(new FilterDTO { Title = "Thương hiệu", Details = brand });

        var clothesSize = (from p in _dbContext.Products
                       join c in _dbContext.ProductColors on p.Id equals c.ProductId
                       join d in _dbContext.ProductDetails on c.Id equals d.ProductColorId
                       where p.CategoryId < 4
                       select d.Size).Distinct().ToArray();
        filters.Add(new FilterDTO { Title = "Size quần áo", Details = clothesSize });

        var shoeSize = (from p in _dbContext.Products
                       join c in _dbContext.ProductColors on p.Id equals c.ProductId
                       join d in _dbContext.ProductDetails on c.Id equals d.ProductColorId
                       where p.CategoryId == 4
                       select d.Size).Distinct().ToArray();
        filters.Add(new FilterDTO { Title = "Size giày", Details = shoeSize });

        return filters;
    }

    private static string GetImageCode(string path)
    {
        int length = path.IndexOf('.') - path.IndexOf('-') - 1;
        return path.Substring(path.IndexOf('-') + 1, length);
    }

    [HttpGet("")]
    public IEnumerable<ProductDetailDTO> GetProductByUrlName(string urlName)
    {
        var detail = (from p in _dbContext.Products
                      join c in _dbContext.ProductColors on p.Id equals c.ProductId
                      join d in _dbContext.ProductDetails on c.Id equals d.ProductColorId
                      join i in _dbContext.ProductImages on c.Id equals i.ProductColorId
                      where p.UrlName == urlName
                      group new { p, c, i, d } by d.Sku into g
                      select new ProductDetailDTO
                      {
                          Sku = g.Key,
                          Name = g.Select(x => x.p.Name).First(),
                          Color = g.Select(x => x.c.Color).First(),
                          Size = g.Select(x => x.d.Size).First(),
                          Price = g.Select(x => x.d.Price).First(),
                          OldPrice = g.Select(x => x.d.OldPrice).First(),
                          Image = GetImageCode(g.Select(x => x.i.Image).First()!),
                          Quantity = g.Select(x => x.d.Quantity).First()
                      }).ToList();
        return detail;
    }

    [HttpGet("img")]
    public IEnumerable<ProductImage> GetProductImages(string urlName)
    {
        var images = (from p in _dbContext.Products
                      join c in _dbContext.ProductColors on p.Id equals c.ProductId
                      join i in _dbContext.ProductImages on c.Id equals i.ProductColorId
                      where p.UrlName == urlName
                      select i).ToList();
        return images;
    }

    [HttpGet("review")]
    public IEnumerable<ProductReviewReadDTO> GetProductReview(int id)
    {
        var review = (from r in _dbContext.ProductReviews
                      join c in _dbContext.
    }
}
