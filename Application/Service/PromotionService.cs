using Application.Interface;
using Core.Entity;
using Core.DTO;
using Core.Interface;

namespace Application.Service;

public class PromotionService : IPromotionService
{
    private readonly IUnitOfWork _unitOfWork;

    public PromotionService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public IEnumerable<Promotion> GetAllPromotions()
    {
        return _unitOfWork.Promotions.GetAllPromotions();
    }

    public IEnumerable<PromotionDetail> GetAllPromotionDetails()
    {
        return _unitOfWork.Promotions.GetAllPromotionDetails();
    }

    public async Task<bool> Insert(Promotion promotion)
    {
        _unitOfWork.Promotions.Insert(promotion);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> Update(Promotion promotion)
    {
        _unitOfWork.Promotions.Update(promotion);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> UpdateDetail(int id, List<PromotionDetail> promotionDetails)
    {
        _unitOfWork.Promotions.UpdateDetail(id, promotionDetails);
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