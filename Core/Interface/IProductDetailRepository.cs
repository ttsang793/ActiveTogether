using Core.Entity;
using Core.DTO;

namespace Core.Interface;

public interface IProductDetailRepository
{    
    IEnumerable<ProductDetailDTO> GetProductByUrlName(string urlName);
    
    IEnumerable<ProductImage> GetProductImages(string urlName);

    ProductDetail GetProductDetailBySku(string sku);

    bool CheckChangeQuantity(string sku, int change);

    void ChangeQuantity(string sku, int change);
}