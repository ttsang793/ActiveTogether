using Core.DTO;
using Core.Entity;

namespace Application.Interface;

public interface IProductDetailService
{
    IEnumerable<ProductDetailDTO> GetProductByUrlName(string urlName);
    
    IEnumerable<ProductImage> GetProductImagesByUrlName(string urlName);

    Task<ProductDetail> GetProductDetailBySku(string sku);

    IEnumerable<ProductDetail> GetProductDetailByColorId(int id);

    IEnumerable<ProductImage> GetProductImagesByColorId(int id);

    Task<bool> ChangeQuantity(string sku, int change);

    Task<bool> Insert(ProductDetailAdminDTO productDetail);

    Task<bool> Update(ProductDetailAdminDTO productDetail);

    Task<bool> Lock(string sku);
  
    Task<bool> Unlock(string sku);
}