using Core.DTO;
using Application.Interface;
using Core.Interface;
using Core.Entity;
using System.Linq.Expressions;

namespace Application.Service;

public class ProductService : IProductService
{
    private readonly IUnitOfWork _unitOfWork;

    public ProductService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    public async Task<IEnumerable<Product>> GetAllProducts(Expression<Func<Product, bool>> expression = null)
    {
        return await _unitOfWork.Products.GetAllProducts(expression);
    }

    public async Task<IEnumerable<Product>> GetAllProductsRead(List<SearchListDTO>? searchDTO = null, int sort = 0)
    {
        Expression<Func<Product, bool>>? searchExpression = null;

        Expression<Func<Product, object>> priceExpression = p => p.Price!;
        Expression<Func<Product, object>> nameExpression = p => p.Name!;

        return sort switch
        {
            0 => await _unitOfWork.Products.GetAllProductsRead(searchDTO),
            1 => await _unitOfWork.Products.GetAllProductsRead(searchDTO, false, priceExpression),
            2 => await _unitOfWork.Products.GetAllProductsRead(searchDTO, true, priceExpression),
            3 => await _unitOfWork.Products.GetAllProductsRead(searchDTO, false, nameExpression),
            4 => await _unitOfWork.Products.GetAllProductsRead(searchDTO, true, nameExpression),
            _ => new List<Product>(),
        };
    }
    
    public List<FilterListDTO> GetAllFilter()
    {
        return _unitOfWork.Products.GetAllFilter();
    }

    public async Task<bool> Insert(Product product)
    {
        _unitOfWork.Products.Insert(product);
        _unitOfWork.Products.Insert(product.ProductSports.ToList());
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> Update(Product product)
    {
        Console.WriteLine("hello world");
        _unitOfWork.Products.Update(product);
        _unitOfWork.Products.Update(product.ProductSports.ToList(), product.Id);
        return await _unitOfWork.SaveChangesAsync();
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
