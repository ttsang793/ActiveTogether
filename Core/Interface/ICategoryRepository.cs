using Core.Entity;
using System.Linq.Expressions;

namespace Core.Interface;
public interface ICategoryRepository : IInsert<Category>, IUpdate<Category>, ILock, IUnlock
{
  IEnumerable<Category> GetAllCategories(Expression<Func<Category, bool>> expression = null);
}