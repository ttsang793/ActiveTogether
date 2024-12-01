using Application.Interface;
using Core.Entity;
using Core.Interface;
using System.Linq.Expressions;

namespace Application.Service;

public class ColorService : IColorService
{
    private readonly IUnitOfWork _unitOfWork;

    public ColorService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public IEnumerable<Color> GetAllColors(Expression<Func<Color, bool>> expression = null)
    {
        return _unitOfWork.Colors.GetAllColors(expression);
    }

    public async Task<bool> Save(Color color)
    {
        await _unitOfWork.Colors.Save(color);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> Lock(string code)
    {
        await _unitOfWork.Colors.Lock(code);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> Unlock(string code)
    {
        await _unitOfWork.Colors.Unlock(code);
        return await _unitOfWork.SaveChangesAsync();
    }
}