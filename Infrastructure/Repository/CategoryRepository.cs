using Core.Interface;
using Core.Entity;
using Infrastructure.Data;
using System.Linq.Expressions;

namespace Infrastructure.Repository;
public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
{
    public CategoryRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public IEnumerable<Category> GetAllCategories(Expression<Func<Category, bool>> expression = null)
    {
        if (expression == null) return GetDbSet().ToList();
        else return GetDbSet().Where(expression).ToList();
    }


    private Category GetById(int id)
    {
        return GetDbSet().First(c => c.Id == id);
    }

    public void Insert(Category category)
    {
        GetDbSet().Add(category);
    }

    public void Update(Category category)
    {
        GetDbSet().Update(category);
    }

    public void Lock(int id)
    {
        var category = GetById(id);
        category.IsActive = false;
    }

    public void Unlock(int id)
    {
        var category = GetById(id);
        category.IsActive = true;
    }
}