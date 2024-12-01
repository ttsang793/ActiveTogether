using Application.Interface;
using Core.Entity;
using Core.Interface;
using Microsoft.AspNetCore.Http;
using System.Linq.Expressions;

namespace Application.Service;

public class SportService : ISportService
{
    private readonly IUnitOfWork _unitOfWork;

    public SportService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public IEnumerable<Sport> GetAllSports(Expression<Func<Sport, bool>> expression = null)
    {
        return _unitOfWork.Sports.GetAllSports(expression);
    }

    public async Task<bool> Insert(Sport sport)
    {
        _unitOfWork.Sports.Insert(sport);
        return (await _unitOfWork.SaveChangesAsync());
    }

    public async Task<bool> Update(Sport sport)
    {
        _unitOfWork.Sports.Update(sport);
        return (await _unitOfWork.SaveChangesAsync());
    }

    public async Task<bool> UploadImage(IFormFile file, string name)
    {
        return (await _unitOfWork.Sports.UploadImage(file, name));
    }

    public async Task<bool> Lock(int id)
    {
        _unitOfWork.Sports.Lock(id);
        return (await _unitOfWork.SaveChangesAsync());
    }

    public async Task<bool> Unlock(int id)
    {
        _unitOfWork.Sports.Unlock(id);
        return (await _unitOfWork.SaveChangesAsync());
    }
}