using Core.Entity;
using Core.DTO;

namespace Core.Interface;

public interface IProductDetailRepository
{    
    IEnumerable<ProductDetailDTO> GetProductByUrlName(string urlName);
    
    IEnumerable<ProductImage> GetProductImagesByUrlName(string urlName);

    Task<ProductDetail> GetProductDetailBySku(string sku);

    IEnumerable<ProductDetail> GetProductDetailByColorId(int id);

    IEnumerable<ProductImage> GetProductImagesByColorId(int id);

    Task<bool> CheckChangeQuantity(string sku, int change);

    Task<bool> ChangeQuantity(string sku, int change);    

    Task<bool> Lock(string sku);
  
    Task<bool> Unlock(string sku);
}