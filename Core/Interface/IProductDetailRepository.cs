using Core.Entity;
using Core.DTO;

namespace Core.Interface;

public interface IProductDetailRepository
{    
    IEnumerable<ProductDetailDTO> GetProductByUrlName(string urlName);
    
    IEnumerable<ProductImage> GetProductImages(string urlName);

    Task<ProductDetail> GetProductDetailBySku(string sku);

    Task<bool> CheckChangeQuantity(string sku, int change);

    Task<bool> ChangeQuantity(string sku, int change);
}