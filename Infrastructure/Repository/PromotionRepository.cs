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

    public void Insert(PromotionAdminDTO promotionDTO)
    {
        Promotion promotion = new Promotion
        {
            Title = promotionDTO.Title,
            DateStart = DateTime.Parse(promotionDTO.DateStart),
            DateEnd = DateTime.Parse(promotionDTO.DateEnd),
            IsActive = true
        };

        GetDbSet().Add(promotion);
    }

    public void Update(PromotionAdminDTO promotionDTO)
    {
        Promotion promotion = GetById((int)promotionDTO.Id);
        promotion.Title = promotionDTO.Title;
        promotion.DateStart = DateTime.Parse(promotionDTO.DateStart);
        promotion.DateEnd = DateTime.Parse(promotionDTO.DateEnd);

        GetDbSet().Update(promotion);
    }

    public void UpdateDetail(int id, List<PromotionDetail> promotionDetails)
    {
        GetDbContext().PromotionDetails.RemoveRange(GetDbContext().PromotionDetails.Where(p => p.PromotionId == id));
        foreach (var pDetail in promotionDetails)
        {
            GetDbContext().PromotionDetails.Add(pDetail);
        }
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