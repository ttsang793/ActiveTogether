using Core.DTO;
using Application.Interface;
using Core.Interface;
using Core.Entity;

namespace Application.Service;

public class ProductService : IProductService
{
    private readonly IUnitOfWork _unitOfWork;

    public ProductService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    
    public IEnumerable<ProductReadDTO> GetAllProducts(string? search, int sort)
    {
        search = (search == null) ? string.Empty : search.ToLower();

        return sort switch
        {
            0 => _unitOfWork.Products.GetAllProductsDefault(search),
            1 => _unitOfWork.Products.GetAllProductsPriceAsc(search),
            2 => _unitOfWork.Products.GetAllProductsPriceDesc(search),
            3 => _unitOfWork.Products.GetAllProductsNameAsc(search),
            4 => _unitOfWork.Products.GetAllProductsNameDesc(search),
            _ => new List<ProductReadDTO>(),
        };
    }
    
    public List<FilterDTO> GetAllFilter()
    {
        return _unitOfWork.Products.GetAllFilter();
    }

    public async Task<bool> Lock(int id)
    {
        _unitOfWork.Products.Lock(id);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> Unlock(int id)
    {
        _unitOfWork.Products.Unlock(id);
        return await _unitOfWork.SaveChangesAsync();
    }
}
