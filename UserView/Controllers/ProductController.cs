using Application.Interface;
using Core.DTO;
using Core.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UserView.Controllers;

[Route("[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly ILogger<BlogController> _logger;
    private readonly IConfiguration _configuration;
    private readonly IProductService _productService;
    private readonly IProductDetailService _productDetailService;
    private readonly IProductReviewService _productReviewService;

    public ProductController(ILogger<BlogController> logger, IConfiguration configuration, IProductService productService, IProductDetailService productDetailService, IProductReviewService productReviewService)
    {
        _logger = logger;
        _configuration = configuration;
        _productService = productService;
        _productDetailService = productDetailService;
        _productReviewService = productReviewService;
    }

    [HttpPost("get")]
    public async Task<IEnumerable<Product>> GetAllProducts([FromBody] List<SearchListDTO>? searchDTO, int sort)
    {
        return await _productService.GetAllProductsRead(searchDTO, sort);
    }
    
    [HttpGet("")]
    public IEnumerable<ProductDetailDTO> GetProductByUrlName(string urlName)
    {
        return _productDetailService.GetProductByUrlName(urlName);
    }

    [HttpGet("get/top")]
    public async Task<IEnumerable<Product>> GetTop5Products()
    {
        DateTime dateStart = DateTime.Parse(_configuration["FirstDay"]);
        return await _productService.ListTop5Seller(dateStart);
    }

    [HttpPost("get/recent/local")]
    public async Task<IEnumerable<Product>> GetRecentViewProduct([Bind("UrlName")] ProductRecentLocalDTO product)
    {
        if (product.UrlName.Any())
        {
            var recentProduct = await _productService.GetAllProducts(p => product.UrlName.Contains(p.UrlName));
            return recentProduct.OrderBy(p => Array.IndexOf(product.UrlName, p.UrlName)).ToList();
        }
        else return new List<Product>();
    }

    [HttpPost("get/recent")]
    public async Task<IEnumerable<Product>> GetRecentViewProduct(string username)
    {
        return await _productService.GetRecentViewProduct(username);
    }

    [HttpPost("update/recent")]
    public async Task<bool> UpdateRecentViewProduct([Bind("Username", "ProductId", "UrlName")] ProductHistory productHistory)
    {
        return await _productService.UpdateRecentViewProduct(productHistory);
    }

    [HttpGet("img")]
    public IEnumerable<ProductImage> GetProductImagesByUrlName(string urlName)
    {
        return _productDetailService.GetProductImagesByUrlName(urlName);
    }

    [HttpGet("filter")]
    public List<FilterListDTO> GetAllFilter()
    {
        return _productService.GetAllFilter();
    }

    [HttpGet("review/get")]
    public IEnumerable<ProductReviewReadDTO> GetAllReviewByUrl(string urlName)
    {
        return _productReviewService.GetAllReviewByUrl(urlName);
    }

    [HttpPost("review/upload")]
    public async Task<StatusCodeResult> Upload([Bind("ProductId", "Sku", "UserName", "Review", "Star")]ProductReviewReadDTO review)
    {
        return (await _productReviewService.Upload(review)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpDelete("review/delete")]
    public async Task<StatusCodeResult> Delete(int id)
    {
        return (await _productReviewService.Delete(id)) ? StatusCode(200) : StatusCode(404);
    }
}
