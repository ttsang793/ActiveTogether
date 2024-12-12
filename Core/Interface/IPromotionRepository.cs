using Core.Entity;
using Core.DTO;
using System.Linq.Expressions;

namespace Core.Interface;
public interface IPromotionRepository : ILock, IUnlock
{
    IEnumerable<Promotion> GetAllPromotions(Expression<Func<Promotion, bool>> expression = null);

    Promotion GetPromotionById(int id);

    void Insert(PromotionAdminDTO promotionDTO);

    void Update(PromotionAdminDTO promotionDTO);
}