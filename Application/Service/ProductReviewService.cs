using Application.Interface;
using Core.DTO;
using Core.Entity;
using Core.Interface;

namespace Application.Service;

public class ProductReviewService : IProductReviewService
{
    private readonly IUnitOfWork _unitOfWork;

    public ProductReviewService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    
    public IEnumerable<ProductReviewReadDTO> GetAllReviewByUrl(string urlName)
    {
        return _unitOfWork.ProductReviews.GetAllReviewByUrl(urlName);
    }

    public async Task<bool> Upload(ProductReviewReadDTO reviewDTO)
    {
        ProductReview review = new ProductReview
        {
            ProductId = reviewDTO.ProductId,
            Sku = reviewDTO.Sku,
            Star = reviewDTO.Star,
            Review = reviewDTO.Review,
            DatePublish = DateTime.Now,
            UserId = await _unitOfWork.Users.GetUserIdByUsername(reviewDTO.Username!)
        };

        _unitOfWork.ProductReviews.Upload(review);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> Delete(int id)
    {
        _unitOfWork.ProductReviews.Delete(id);
        return await _unitOfWork.SaveChangesAsync();
    }
}