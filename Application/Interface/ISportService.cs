using Core.Entity;
using Microsoft.AspNetCore.Http;
using System.Linq.Expressions;

namespace Application.Interface;

public interface ISportService
{
    IEnumerable<Sport> GetAllSports(Expression<Func<Sport, bool>> expression = null);

    Task<bool> Insert(Sport sport);

    Task<bool> Update(Sport sport);

    Task<bool> UploadImage(IFormFile file, string name);

    Task<bool> Lock(int id);

    Task<bool> Unlock(int id);
}