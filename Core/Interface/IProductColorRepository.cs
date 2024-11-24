using Core.Entity;
using Core.DTO;

namespace Core.Interface;

public interface IProductColorRepository : ILock, IUnlock
{
    IEnumerable<ProductColor> GetProductColorByProductId(int productId);
}