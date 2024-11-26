using Core.DTO;
using Core.Entity;

namespace Application.Interface;

public interface IProductService
{
    Task<IEnumerable<Product>> GetAllProducts(string search = "", int sort = 0);

    List<FilterDTO> GetAllFilter();

    Task<bool> Insert(Product product);

    Task<bool> Update(Product product);

    Task<bool> Lock(int id);

    Task<bool> Unlock(int id);
}
