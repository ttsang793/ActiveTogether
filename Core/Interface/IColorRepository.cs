using Core.Entity;
using System.Linq.Expressions;

namespace Core.Interface;

public interface IColorRepository : IInsert<Color>, IUpdate<Color>
{
    IEnumerable<Color> GetAllColors(Expression<Func<Color, bool>> expression = null);

    void Lock(string code);
  
    void Unlock(string code);
}