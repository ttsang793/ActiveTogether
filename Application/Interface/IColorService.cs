using Core.Entity;

namespace Application.Interface;

public interface IColorService
{
    IEnumerable<Color> GetAllColors();

    Task<sbyte> Save(Color color);

    Task<bool> Lock(string code);

    Task<bool> Unlock(string code);
}