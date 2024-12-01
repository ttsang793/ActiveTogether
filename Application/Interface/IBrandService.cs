using Core.Entity;
using System.Linq.Expressions;

namespace Application.Interface;

public interface IBrandService
{
    IEnumerable<Brand> GetAllBrands(Expression<Func<Brand, bool>> expression = null);

    Task<bool> Insert(Brand brand);

    Task<bool> Update(Brand brand);

    Task<bool> Lock(int id);

    Task<bool> Unlock(int id);
}