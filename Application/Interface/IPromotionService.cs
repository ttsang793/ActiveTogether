using Core.Entity;
using Core.DTO;

namespace Application.Interface;

public interface IPromotionService
{
    IEnumerable<Promotion> GetAllPromotions();

    IEnumerable<PromotionDetail> GetAllPromotionDetails();

    Task<bool> Insert(PromotionAdminDTO promotionDTO);

    Task<bool> Update(PromotionAdminDTO promotionDTO);

    Task<bool> UpdateDetail(int id, List<PromotionDetail> promotionDetails);

    Task<bool> Lock(int id);

    Task<bool> Unlock(int id);
}