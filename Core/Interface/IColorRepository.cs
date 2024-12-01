using Core.Entity;
using System.Linq.Expressions;

namespace Core.Interface;

public interface IColorRepository
{
    IEnumerable<Color> GetAllColors(Expression<Func<Color, bool>> expression = null);

    Task<Color> GetByColorCode(string code);

    Task Save(Color color);

    Task Lock(string code);
  
    Task Unlock(string code);
}