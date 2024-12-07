using Core.Entity;
using System.Linq.Expressions;

namespace Core.Interface;
public interface IBrandRepository : IInsert<Brand>, IUpdate<Brand>, ILock, IUnlock
{
    IEnumerable<Brand> GetAllBrands(Expression<Func<Brand, bool>> expression = null);
}