using Core.DTO;
using Core.Entity;

namespace Application.Interface;
public interface IProductReviewService
{
    IEnumerable<ProductReviewReadDTO> GetAllReviewByUrl(string urlName);

    Task<bool> Upload(ProductReviewReadDTO reviewDTO);

    Task<bool> Delete(int id);
}