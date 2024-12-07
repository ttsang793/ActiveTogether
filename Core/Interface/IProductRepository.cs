using Core.DTO;
using Core.Entity;
using System.Linq.Expressions;

namespace Core.Interface;

public interface IProductRepository : IInsert<Product>, IUpdate<Product>, ILock, IUnlock
{
    Task<IEnumerable<Product>> GetAllProducts(Expression<Func<Product, bool>> expression = null);

    Task<IEnumerable<Product>> GetAllProductsRead(List<SearchListDTO>? searchDTO = null, bool desc = false, Expression<Func<Product, object>> expression = null);

    void Insert(List<ProductSport> productSports);

    void Update(List<ProductSport> productSports, int id);

    void UpdatePrice(int id);

    List<FilterListDTO> GetAllFilter();

    Task<IEnumerable<Product>> ListTop5Seller(DateTime dateStart);

    Task<IEnumerable<StatisticDTO>> ListBestSeller(DateTime dateStart, DateTime dateEnd);

    Task<IEnumerable<StatisticDTO>> ListSaleByBrand(DateTime dateStart, DateTime dateEnd);

    IEnumerable<Product> GetAllProducts();

}