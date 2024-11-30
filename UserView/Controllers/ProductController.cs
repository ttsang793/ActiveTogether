﻿using Application.Interface;
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
    private readonly IProductService _productService;
    private readonly IProductDetailService _productDetailService;
    private readonly IProductReviewService _productReviewService;

    public ProductController(ILogger<BlogController> logger, IProductService productService, IProductDetailService productDetailService, IProductReviewService productReviewService)
    {
        _logger = logger;
        _productService = productService;
        _productDetailService = productDetailService;
        _productReviewService = productReviewService;
    }

    [HttpPost("get")]
    public async Task<IEnumerable<Product>> GetAllProducts([FromBody] List<SearchListDTO>? searchDTO, int sort)
    {
        return await _productService.GetAllProducts(searchDTO, sort);
    }
    
    [HttpGet("")]
    public IEnumerable<ProductDetailDTO> GetProductByUrlName(string urlName)
    {
        return _productDetailService.GetProductByUrlName(urlName);
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
    public async Task<StatusCodeResult> Upload ([Bind("ProductId", "Sku", "UserName", "Review", "Star")]ProductReviewReadDTO review)
    {
        return (await _productReviewService.Upload(review)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpDelete("review/delete")]
    public async Task<StatusCodeResult> Delete(int id)
    {
        return (await _productReviewService.Delete(id)) ? StatusCode(200) : StatusCode(404);
    }
}
