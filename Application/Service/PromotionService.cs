using Application.Interface;
using Core.Entity;
using Core.DTO;
using Core.Interface;
using System.Linq.Expressions;

namespace Application.Service;

public class PromotionService : IPromotionService
{
    private readonly IUnitOfWork _unitOfWork;

    public PromotionService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public IEnumerable<Promotion> GetAllPromotions(Expression<Func<Promotion, bool>> expression = null)
    {
        return _unitOfWork.Promotions.GetAllPromotions(expression);
    }

    public Promotion GetPromotionById(int id)
    {
        return _unitOfWork.Promotions.GetPromotionById(id);
    }

    public async Task<bool> Insert(PromotionAdminDTO promotionDTO)
    {
        _unitOfWork.Promotions.Insert(promotionDTO);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> Update(PromotionAdminDTO promotionDTO)
    {
        _unitOfWork.Promotions.Update(promotionDTO);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> Lock(int id)
    {
        _unitOfWork.Promotions.Lock(id);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> Unlock(int id)
    {
        _unitOfWork.Promotions.Unlock(id);
        return await _unitOfWork.SaveChangesAsync();
    }
}