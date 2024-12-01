using Core.Interface;
using Core.Entity;
using Infrastructure.Data;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

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


    public async Task<Color> GetByColorCode(string code)
    {
        try
        {
            return await GetDbSet().Where(c => c.Code == code).FirstOrDefaultAsync();
        }
        catch
        {
            return null;
        }
    }

    public async Task Save(Color color)
    {
        bool isExisting = GetDbSet().Any(c => c.Code == color.Code);

        if (!isExisting) GetDbSet().Add(color);
        else GetDbSet().Update(color);
    }

    public async Task Lock(string code)
    {
        var color = await GetByColorCode(code);
        color.IsActive = false;
    }

    public async Task Unlock(string code)
    {
        var color = await GetByColorCode(code);
        color.IsActive = true;
    }
}