using Core.Entity;
using Core.DTO;

namespace Application.Interface;

public interface IProductColorService
{
    IEnumerable<ProductColor> GetProductColorByProductId(int productId);

    Task<bool> Lock(int id);

    Task<bool> Unlock(int id);
}