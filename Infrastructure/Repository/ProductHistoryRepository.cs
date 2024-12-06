using Core.Entity;
using Core.Interface;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infrastructure.Repository;

public class ProductHistoryRepository : BaseRepository<ProductHistory>, IProductHistoryRepository
{
    public ProductHistoryRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public async Task<IEnumerable<string>> GetAllAsync(Expression<Func<ProductHistory, bool>> expression = null)
    {
        var history = (await base.GetAllAsync(expression)).OrderByDescending(p => p.Timestamp);
        return from ph in history select ph.UrlName;
    }

    public void Insert(ProductHistory productHistory)
    {
        GetDbSet().Add(productHistory);
    }

    public async Task Update(ProductHistory productHistory)
    {
        var findProductHistory = await GetDbSet().Where(x => (x.ProductId == productHistory.ProductId && x.Username == productHistory.Username)).FirstOrDefaultAsync();
        if (findProductHistory != null)
        {
            await GetDbContext().Database.ExecuteSqlRawAsync
                ($"UPDATE product_history SET timestamp = current_timestamp " +
                    $"WHERE product_id = {productHistory.ProductId} AND username = '{productHistory.Username}'");
        }
        else Insert(productHistory);
    }
}
