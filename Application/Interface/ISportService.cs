using Core.Entity;

namespace Application.Interface;

public interface ISportService
{
    IEnumerable<Sport> GetAllSports();

    Task<bool> Insert(Sport sport);

    Task<bool> Update(Sport sport);

    Task<bool> Lock(int id);

    Task<bool> Unlock(int id);
}