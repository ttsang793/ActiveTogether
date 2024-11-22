using Core.Entity;

namespace Application.Interface;

public interface ICategoryService
{
    IEnumerable<Category> GetAllCategories();

    Task<bool> Insert(Category category);

    Task<bool> Update(Category category);

    Task<bool> Lock(int id);

    Task<bool> Unlock(int id);
}