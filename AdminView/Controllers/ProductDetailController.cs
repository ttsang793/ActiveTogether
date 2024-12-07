using Application.Interface;
using Core.DTO;
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

    private string[] DataValidation(ProductDetailAdminDTO productDetail, bool isUpdate)
    {
        string[] results = new string[3];
        bool errorFlag = false;
        if (string.IsNullOrEmpty(productDetail.Size))
        {
            errorFlag = true;
            results[0] = "Vui lòng nhập size, hoặc để FREE nếu không có size";
        }
        else if (isUpdate == false && GetProductDetailByColorId((int)productDetail.ProductColorId).Where(p => p.Size.ToLower() == productDetail.Size.ToLower()).Any())
        {
            errorFlag = true;
            results[0] = "Size đã tồn tại";
        }
        else if (isUpdate == false && GetProductDetailByColorId((int)productDetail.ProductColorId).Where(p => p.Size == "FREE" && p.IsActive == true).Any())
        {
            errorFlag = true;
            results[0] = "Vui lòng khóa size FREE trước khi cập nhật size hiện tại";
        }
        else if (isUpdate == false && GetProductDetailByColorId((int)productDetail.ProductColorId).Any())
        {
            errorFlag = true;
            results[0] = "Vui lòng chọn size khác FREE";
        }

        if (productDetail.Price == 0)
        {
            errorFlag = true;
            results[1] = "Vui lòng nhập giá";
        }

        if (string.IsNullOrEmpty(productDetail.Note))
        {
            errorFlag = true;
            results[2] = "Vui lòng nhập lý do vì sao có giá đó";
        }

        return (errorFlag) ? results : Array.Empty<string>();
    }

    [HttpPost("add")]
    public async Task<IActionResult> Insert([Bind("ProductId", "ProductColorId", "Sku", "Size", "Price", "Note")] ProductDetailAdminDTO productDetail)
    {
        string[] validation = DataValidation(productDetail, false);
        if (validation.Length > 0) return BadRequest(new {errors = validation});
        return (await _productDetailService.Insert(productDetail)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update([Bind("ProductId", "ProductColorId", "Sku", "Size", "Price", "Note")] ProductDetailAdminDTO productDetail)
    {
        string[] validation = DataValidation(productDetail, true);
        if (validation.Length > 0) return BadRequest(new { errors = validation });
        return (await _productDetailService.Update(productDetail)) ? StatusCode(200) : StatusCode(404);
    }

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