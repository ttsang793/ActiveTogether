using Core.Entity;
using Core.DTO;
using System.Linq.Expressions;

namespace Application.Interface;

public interface IPromotionService
{
    IEnumerable<Promotion> GetAllPromotions(Expression<Func<Promotion, bool>> expression = null);

    Promotion GetPromotionById(int id);

    Task<bool> Insert(PromotionAdminDTO promotionDTO);

    Task<bool> Update(PromotionAdminDTO promotionDTO);

    Task<bool> Lock(int id);

    Task<bool> Unlock(int id);
}