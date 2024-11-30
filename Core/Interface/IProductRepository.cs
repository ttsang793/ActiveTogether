using Core.DTO;
using Core.Entity;
using System.Linq.Expressions;

namespace Core.Interface;

public interface IProductRepository : IInsert<Product>, IUpdate<Product>, ILock, IUnlock
{
    Task<IEnumerable<Product>> GetAllProducts(List<SearchListDTO>? searchDTO = null, bool desc = false, Expression<Func<Product, object>> expression = null);

    void Insert(List<ProductSport> productSports);

    void Update(List<ProductSport> productSports, int id);

    List<FilterListDTO> GetAllFilter();

    IEnumerable<Product> GetAllProducts();
}