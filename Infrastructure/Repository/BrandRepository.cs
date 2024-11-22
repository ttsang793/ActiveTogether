using Core.Interface;
using Core.Entity;
using Infrastructure.Data;
using System.Linq.Expressions;

namespace Infrastructure.Repository;
public class BrandRepository : BaseRepository<Brand>, IBrandRepository
{
    public BrandRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public IEnumerable<Brand> GetAllBrands(Expression<Func<Brand, bool>> expression = null)
    {
      if (expression == null) return GetDbSet().ToList();
      else return GetDbSet().Where(expression).ToList();
    }


    private Brand GetById(int id)
    {
        return GetDbSet().First(b => b.Id == id);
    }

    public void Insert(Brand brand)
    {
        GetDbSet().Add(brand);
    }

    public void Update(Brand brand)
    {
        GetDbSet().Update(brand);
    }

    public void Lock(int id)
    {
        var brand = GetById(id);
        brand.IsActive = false;
    }

    public void Unlock(int id)
    {
        var brand = GetById(id);
        brand.IsActive = true;
    }
}