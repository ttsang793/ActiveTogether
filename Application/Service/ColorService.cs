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

    public async Task<bool> Insert(Color color)
    {
        _unitOfWork.Colors.Insert(color);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> Update(Color color)
    {
        _unitOfWork.Colors.Update(color);
        return await _unitOfWork.SaveChangesAsync();
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