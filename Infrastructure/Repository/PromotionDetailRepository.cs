using Core.Entity;
using Core.Interface;
using Infrastructure.Data;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository;

public class PromotionDetailRepository : BaseRepository<PromotionDetail>, IPromotionDetailRepository
{
    public PromotionDetailRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public async Task<IEnumerable<PromotionDetail>> GetAllPromotionDetails(Expression<Func<PromotionDetail, bool>> expression = null)
    {
        if (expression == null) return await GetDbSet().ToListAsync();
        else return await GetDbSet().Where(expression).ToListAsync();
    }

    public async Task Update(List<PromotionDetail> promotionDetails, int id)
    {
        GetDbSet().RemoveRange((await GetDbSet().Where(pd => pd.PromotionId == id).ToListAsync()));
        await GetDbSet().AddRangeAsync(promotionDetails);
    }
}
