using Core.Entity;
using System.Linq.Expressions;

namespace Application.Interface;

public interface ICategoryService
{
    IEnumerable<Category> GetAllCategories(Expression<Func<Category, bool>> expression = null);

    Task<bool> Insert(Category category);

    Task<bool> Update(Category category);

    Task<bool> Lock(int id);

    Task<bool> Unlock(int id);
}