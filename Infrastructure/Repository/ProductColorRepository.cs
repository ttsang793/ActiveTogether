using Core.DTO;
using Core.Entity;
using Core.Interface;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infrastructure.Repository;

public class ProductColorRepository : BaseRepository<ProductColor>, IProductColorRepository
{
    public ProductColorRepository(AtWebContext dbContext) : base(dbContext)
    {
    }
    
    private static string GetImageCode(string path)
    {
        int length = path.IndexOf('.') - path.IndexOf('-') - 1;
        return path.Substring(path.IndexOf('-') + 1, length);
    }

    public IEnumerable<ProductColor> GetProductColorByProductId(int productId)
    {
        var color = GetDbSet().Include(c => c.ColorCode).ToList();
        return color;
    }    

    private ProductColor GetById(int id)
    {
        return GetDbSet().First(s => s.Id == id);
    }

    public void Lock(int id)
    {
        var productColor = GetById(id);
        productColor.IsActive = false;
    }

    public void Unlock(int id)
    {
        var productColor = GetById(id);
        productColor.IsActive = true;
    }
}
