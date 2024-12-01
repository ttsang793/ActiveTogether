using Core.Entity;
using System.Linq.Expressions;

namespace Application.Interface;

public interface IColorService
{
    IEnumerable<Color> GetAllColors(Expression<Func<Color, bool>> expression = null);

    Task<bool> Save(Color color);

    Task<bool> Lock(string code);

    Task<bool> Unlock(string code);
}