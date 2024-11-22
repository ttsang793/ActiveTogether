using Core.DTO;
using Core.Entity;

namespace Application.Interface;

public interface IProductService
{
    IEnumerable<ProductReadDTO> GetAllProducts(string? search, int sort);

    List<FilterDTO> GetAllFilter();
}
