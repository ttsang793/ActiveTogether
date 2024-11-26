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

    public IEnumerable<ProductColor> GetProductColorByProductId(int productId)
    {
        var color = GetDbSet().Include(c => c.ColorCodeNavigation).Include(c => c.ProductImages).Where(p => p.ProductId == productId).ToList();
        return color;
    }    

    private ProductColor GetById(int id)
    {
        return GetDbSet().First(s => s.Id == id);
    }

    public void Insert(ProductColor productColor)
    {
        productColor.IsActive = true;
        GetDbSet().Add(productColor);
    }

    public void Update(ProductColor productColor)
    {
        var pc = GetById(productColor.Id);
        pc.ColorCode = productColor.ColorCode;
        GetDbSet().Update(pc);
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
