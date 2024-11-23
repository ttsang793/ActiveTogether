using Core.DTO;
using Core.Entity;

namespace Core.Interface;

public interface IProductRepository : ILock, IUnlock
{
    IEnumerable<ProductReadDTO> GetAllProductsDefault(string search);

    IEnumerable<ProductReadDTO> GetAllProductsPriceAsc(string search);

    IEnumerable<ProductReadDTO> GetAllProductsPriceDesc(string search);

    IEnumerable<ProductReadDTO> GetAllProductsNameAsc(string search);
    
    IEnumerable<ProductReadDTO> GetAllProductsNameDesc(string search);

    List<FilterDTO> GetAllFilter();
}