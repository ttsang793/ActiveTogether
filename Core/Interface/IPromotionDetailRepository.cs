using Core.Entity;
using System.Linq.Expressions;


namespace Core.Interface;

public interface IPromotionDetailRepository
{
    Task<IEnumerable<PromotionDetail>> GetAllPromotionDetails(Expression<Func<PromotionDetail, bool>> expression = null);

    Task Update(List<PromotionDetail> promotionDetails, int id);
}
