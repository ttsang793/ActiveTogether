using Core.DTO;
using Core.Entity;

namespace Application.Interface;

public interface IProductDetailService
{
    IEnumerable<ProductDetailDTO> GetProductByUrlName(string urlName);

    IEnumerable<ProductImage> GetProductImages(string urlName);

    ProductDetail GetProductDetailBySku(string sku);
    
    Task<bool> ChangeQuantity(string sku, int change);
}