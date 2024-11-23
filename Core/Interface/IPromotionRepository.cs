using Core.Entity;
using System.Linq.Expressions;

namespace Core.Interface;
public interface IPromotionRepository : IInsert<Promotion>, IUpdate<Promotion>, ILock, IUnlock
{
  IEnumerable<Promotion> GetAllPromotions(Expression<Func<Promotion, bool>> expression = null);

  IEnumerable<PromotionDetail> GetAllPromotionDetails();
}