using Core.Entity;
using System.Linq.Expressions;

namespace Core.Interface;

public interface ISportRepository : IInsert<Sport>, IUpdate<Sport>, ILock, IUnlock
{
    IEnumerable<Sport> GetAllSports(Expression<Func<Sport, bool>> expression = null);
}