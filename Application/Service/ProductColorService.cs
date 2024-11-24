using Application.Interface;
using Core.DTO;
using Core.Entity;
using Core.Interface;

namespace Application.Service;

public class ProductColorService : IProductColorService
{
    private readonly IUnitOfWork _unitOfWork;

    public ProductColorService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    
    public IEnumerable<ProductColor> GetProductColorByProductId(int productId)
    {
        return _unitOfWork.ProductColors.GetProductColorByProductId(productId);
    }

    public async Task<bool> Lock(int id)
    {
        _unitOfWork.ProductColors.Lock(id);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> Unlock(int id)
    {
        _unitOfWork.ProductColors.Unlock(id);
        return await _unitOfWork.SaveChangesAsync();
    }
}