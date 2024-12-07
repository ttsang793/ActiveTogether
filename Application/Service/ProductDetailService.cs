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

    public IEnumerable<ProductImage> GetProductImagesByUrlName(string urlName)
    {
        return _unitOfWork.ProductDetails.GetProductImagesByUrlName(urlName);
    }

    public async Task<ProductDetail> GetProductDetailBySku(string sku)
    {
        return await _unitOfWork.ProductDetails.GetProductDetailBySku(sku);
    }

    public IEnumerable<ProductDetail> GetProductDetailByColorId(int id)
    {
        return _unitOfWork.ProductDetails.GetProductDetailByColorId(id);
    }

    public IEnumerable<ProductImage> GetProductImagesByColorId(int id)
    {
        return _unitOfWork.ProductDetails.GetProductImagesByColorId(id);
    }

    public async Task<bool> ChangeQuantity(string sku, int change)
    {
        await _unitOfWork.ProductDetails.ChangeQuantity(sku, change);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> Insert(ProductDetailAdminDTO productDetail)
    {
        var pDetail = new ProductDetail { ProductColorId = productDetail.ProductColorId, Quantity = 0, Sku = productDetail.Sku, Size = productDetail.Size, Price = productDetail.Price, Note = productDetail.Note };
        
        _unitOfWork.ProductDetails.Insert(pDetail);
        _unitOfWork.Products.UpdatePrice(productDetail.ProductId);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> Update(ProductDetailAdminDTO productDetail)
    {
        var pDetail = new ProductDetail { Sku = productDetail.Sku, Size = productDetail.Size, Price = productDetail.Price, Note = productDetail.Note };

        _unitOfWork.ProductDetails.Update(pDetail);
        _unitOfWork.Products.UpdatePrice(productDetail.ProductId);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> Lock(string sku)
    {
        await _unitOfWork.ProductDetails.Lock(sku);
        return await _unitOfWork.SaveChangesAsync();
    }
  
    public async Task<bool> Unlock(string sku)
    {
        await _unitOfWork.ProductDetails.Unlock(sku);
        return await _unitOfWork.SaveChangesAsync();
    }
}