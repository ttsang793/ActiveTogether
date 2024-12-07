using Core.Entity;
using Core.DTO;
using Microsoft.AspNetCore.Http;

namespace Core.Interface;

public interface IProductColorRepository : IInsert<ProductColor>, IUpdate<ProductColor>, ILock, IUnlock
{
    int GetProductColorLength();

    IEnumerable<ProductColor> GetProductColorByProductId(int productId);

    Task<bool> UploadImages(IFormFile[] file, int id, int productId);
}