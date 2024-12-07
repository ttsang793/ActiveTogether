using Core.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Application.Interface;

public interface IProductColorService
{
    int GetProductColorLength();

    IEnumerable<ProductColor> GetProductColorByProductId(int productId);

    Task<bool> Insert(ProductColor color);

    Task<bool> Update(ProductColor color);

    Task<bool> UploadImages(IFormFile[] file, int id, int productId);

    Task<bool> Lock(int id);

    Task<bool> Unlock(int id);
}