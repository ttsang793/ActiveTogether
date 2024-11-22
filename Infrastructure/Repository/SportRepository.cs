using Core.Interface;
using Core.Entity;
using Infrastructure.Data;
using System.Linq.Expressions;

namespace Infrastructure.Repository;
public class SportRepository : BaseRepository<Sport>, ISportRepository
{
    public SportRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public IEnumerable<Sport> GetAllSports(Expression<Func<Sport, bool>> expression = null)
    {
      if (expression == null) return GetDbSet().ToList();
      else return GetDbSet().Where(expression).ToList();
    }

    private Sport GetById(int id)
    {
        return GetDbSet().First(s => s.Id == id);
    }

    public void Insert(Sport sport)
    {
        GetDbSet().Add(sport);
    }

    public void Update(Sport sport)
    {
        GetDbSet().Update(sport);
    }

    public void Lock(int id)
    {
        var sport = GetById(id);
        sport.IsActive = false;
    }

    public void Unlock(int id)
    {
        var sport = GetById(id);
        sport.IsActive = true;
    }
}