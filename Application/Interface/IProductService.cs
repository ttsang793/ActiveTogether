using Core.DTO;
using Core.Entity;
using System.Linq.Expressions;

namespace Application.Interface;

public interface IProductService
{
    Task<IEnumerable<Product>> GetAllProducts(Expression<Func<Product, bool>> expression = null);

    Task<IEnumerable<Product>> GetAllProductsRead(List<SearchListDTO>? search = null, int sort = 0);

    Task<IEnumerable<StatisticDTO>> ListBestSeller(DateTime dateStart, DateTime dateEnd);

    Task<IEnumerable<Product>> ListTop5Seller(DateTime dateStart);

    Task<IEnumerable<StatisticDTO>> ListSaleByBrand(DateTime dateStart, DateTime dateEnd);

    Task<IEnumerable<Product>> GetRecentViewProduct(string username);

    Task<bool> UpdateRecentViewProduct(ProductHistory productHistory);
    
    List<FilterListDTO> GetAllFilter();

    Task<bool> Insert(Product product);

    Task<bool> Update(Product product);

    Task<bool> Lock(int id);

    Task<bool> Unlock(int id);
}
