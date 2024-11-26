using Core.Entity;
using Core.DTO;

namespace Core.Interface;

public interface IProductColorRepository : IInsert<ProductColor>, IUpdate<ProductColor>, ILock, IUnlock
{
    IEnumerable<ProductColor> GetProductColorByProductId(int productId);
}