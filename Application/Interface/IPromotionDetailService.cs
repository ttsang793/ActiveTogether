using Core.Entity;
using System.Linq.Expressions;

namespace Application.Interface;

public interface IPromotionDetailService
{
    Task<IEnumerable<PromotionDetail>> GetAllPromotionDetails(Expression<Func<PromotionDetail, bool>> expression = null);

    Task<bool> Update(List<PromotionDetail> promotionDetails, int id);
}
