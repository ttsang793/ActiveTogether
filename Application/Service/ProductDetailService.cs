using Application.Interface;
using Core.DTO;
using Core.Entity;
using Core.Interface;

namespace Application.Service;

public class ProductDetailService : IProductDetailService
{
    private readonly IUnitOfWork _unitOfWork;

    public ProductDetailService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public IEnumerable<ProductDetailDTO> GetProductByUrlName(string urlName)
    {
        return _unitOfWork.ProductDetails.GetProductByUrlName(urlName);
    }

    public IEnumerable<ProductImage> GetProductImages(string urlName)
    {
        return _unitOfWork.ProductDetails.GetProductImages(urlName);
    }

    public ProductDetail GetProductDetailBySku(string sku)
    {
        return _unitOfWork.ProductDetails.GetProductDetailBySku(sku);
    }

    public async Task<bool> ChangeQuantity(string sku, int change)
    {
        _unitOfWork.ProductDetails.ChangeQuantity(sku, change);
        return await _unitOfWork.SaveChangesAsync();
    }
}