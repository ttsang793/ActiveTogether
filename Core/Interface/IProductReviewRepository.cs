using Core.DTO;
using Core.Entity;

namespace Core.Interface;
public interface IProductReviewRepository
{
    IEnumerable<ProductReviewReadDTO> GetAllReviewByUrl(string urlName);

    void Upload(ProductReview review);

    void Delete(int id);
}