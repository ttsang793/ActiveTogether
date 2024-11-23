using Core.Interface;
using Core.Entity;
using Infrastructure.Data;
using System.Linq.Expressions;

namespace Infrastructure.Repository;
public class ColorRepository : BaseRepository<Color>, IColorRepository
{
    public ColorRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public IEnumerable<Color> GetAllColors(Expression<Func<Color, bool>> expression = null)
    {
      if (expression == null) return GetDbSet().ToList();
      else return GetDbSet().Where(expression).ToList();
    }


    public Color GetByColorCode(string code)
    {
        return GetDbSet().FirstOrDefault(c => c.Code == code);
    }

    public void Insert(Color color)
    {
        GetDbSet().Add(color);
    }

    public void Update(Color color)
    {
        GetDbSet().Update(color);
    }

    public void Lock(string code)
    {
        var color = GetByColorCode(code);
        color.IsActive = false;
    }

    public void Unlock(string code)
    {
        var color = GetByColorCode(code);
        color.IsActive = true;
    }
}