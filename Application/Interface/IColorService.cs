using Core.Entity;

namespace Application.Interface;

public interface IColorService
{
    IEnumerable<Color> GetAllColors();

    Task<bool> Insert(Color color);

    Task<bool> Update(Color color);

    Task<bool> Lock(string code);

    Task<bool> Unlock(string code);
}