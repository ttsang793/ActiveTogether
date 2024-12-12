using Core.Entity;
using Core.Interface;
using Application.Interface;
using System.Linq.Expressions;

namespace Application.Service;

public class PromotionDetailService : IPromotionDetailService
{
    private readonly IUnitOfWork _unitOfWork;

    public PromotionDetailService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<PromotionDetail>> GetAllPromotionDetails(Expression<Func<PromotionDetail, bool>> expression = null)
    {
        return await _unitOfWork.PromotionDetails.GetAllPromotionDetails(expression);
    }

    public async Task<bool> Update(List<PromotionDetail> promotionDetails, int id)
    {
        await _unitOfWork.PromotionDetails.Update(promotionDetails, id);
        return await _unitOfWork.SaveChangesAsync();
    }
}
