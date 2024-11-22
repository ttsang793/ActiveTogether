using Core.Interface;
using Core.Entity;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infrastructure.Repository;
public class BaseRepository<T> where T : BaseEntity
{
    private readonly AtWebContext _dbContext;

    public BaseRepository(AtWebContext dbContext)
    {
        _dbContext = dbContext;
    }

    public AtWebContext GetDbContext()
    {
        return _dbContext;
    }

    public DbSet<T> GetDbSet()
    {
        return _dbContext.Set<T>();
    }

    public virtual async Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> expression = null)
    {
        if (expression == null) return await GetDbSet().ToListAsync();
        else return await GetDbSet().Where(expression).ToListAsync();
    }
}