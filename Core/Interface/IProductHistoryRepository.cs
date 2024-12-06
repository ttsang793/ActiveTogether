using Core.Entity;
using System.Linq.Expressions;

namespace Core.Interface;

public interface IProductHistoryRepository : IRepository<ProductHistory>, IInsert<ProductHistory>
{
    Task<IEnumerable<string>> GetAllAsync(Expression<Func<ProductHistory, bool>> expression = null);

    Task Update(ProductHistory productHistory);
}