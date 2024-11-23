using Application.Interface;
using Core.Entity;
using Core.Interface;

namespace Application.Service;

public class ColorService : IColorService
{
    private readonly IUnitOfWork _unitOfWork;

    public ColorService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public IEnumerable<Color> GetAllColors()
    {
        return _unitOfWork.Colors.GetAllColors();
    }

    public async Task<sbyte> Save(Color color)
    {
        Color c = _unitOfWork.Colors.GetByColorCode(color.Code);
        Console.WriteLine(c == null);
        if (c == null)
        {
            _unitOfWork.Colors.Insert(color);
            return (await _unitOfWork.SaveChangesAsync()) ? (sbyte)0 : (sbyte)-1;
        }
        else
        {
            _unitOfWork.Colors.Update(color);
            return (await _unitOfWork.SaveChangesAsync()) ? (sbyte)1 : (sbyte)-1;
        }
    }

    public async Task<bool> Lock(string code)
    {
        _unitOfWork.Colors.Lock(code);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> Unlock(string code)
    {
        _unitOfWork.Colors.Unlock(code);
        return await _unitOfWork.SaveChangesAsync();
    }
}