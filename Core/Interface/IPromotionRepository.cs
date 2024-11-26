using Core.Entity;
using Core.DTO;
using System.Linq.Expressions;

namespace Core.Interface;
public interface IPromotionRepository : ILock, IUnlock
{
    IEnumerable<Promotion> GetAllPromotions(Expression<Func<Promotion, bool>> expression = null);

    IEnumerable<PromotionDetail> GetAllPromotionDetails();

    void Insert(PromotionAdminDTO promotionDTO);

    void Update(PromotionAdminDTO promotionDTO);

    void UpdateDetail(int id, List<PromotionDetail> promotionDetails);
}