using Core.Interface;
using Core.Entity;
using Core.DTO;
using Infrastructure.Data;
using System.Linq.Expressions;

namespace Infrastructure.Repository;
public class PromotionRepository : BaseRepository<Promotion>, IPromotionRepository
{
    public PromotionRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public IEnumerable<Promotion> GetAllPromotions(Expression<Func<Promotion, bool>> expression = null)
    {
      if (expression == null) return GetDbSet().ToList();
      else return GetDbSet().Where(expression).ToList();
    }

    public IEnumerable<PromotionDetail> GetAllPromotionDetails()
    {
        return GetDbContext().PromotionDetails.ToList();
    }

    private Promotion GetById(int id)
    {
        return GetDbSet().First(b => b.Id == id);
    }

    public void Insert(Promotion promotion)
    {
        GetDbSet().Add(promotion);
    }

    public void Update(Promotion promotion)
    {
        GetDbSet().Update(promotion);
    }

    public void Lock(int id)
    {
        var promotion = GetById(id);
        promotion.IsActive = false;
    }

    public void Unlock(int id)
    {
        var promotion = GetById(id);
        promotion.IsActive = true;
    }
}