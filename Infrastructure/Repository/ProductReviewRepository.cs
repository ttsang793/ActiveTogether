using Core.Interface;
using Core.Entity;
using Core.DTO;
using Infrastructure.Data;

namespace Infrastructure.Repository;
public class ProductReviewRepository : BaseRepository<ProductReview>, IProductReviewRepository
{
    public ProductReviewRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public IEnumerable<ProductReviewReadDTO> GetAllReviewByUrl(string urlName)
    {
        return (from pr in GetDbSet()
                join u in GetDbContext().Users on pr.UserId equals u.Id
                join pd in GetDbContext().ProductDetails on pr.Sku equals pd.Sku
                join pc in GetDbContext().ProductColors on pd.ProductColorId equals pc.Id
                join c in GetDbContext().Colors on pc.ColorCode equals c.Code
                join p in GetDbContext().Products on pc.ProductId equals p.Id
                where p.UrlName == urlName
                orderby pr.DatePublish descending
                select new ProductReviewReadDTO {
                    Id = pr.Id,
                    ProductId = p.Id,
                    Sku = pd.Sku,
                    Size = pd.Size,
                    Color = c.Name,
                    UserId = u.Id,
                    UserFullName = u.FullName,
                    Review = pr.Review,
                    Star = pr.Star,
                    DatePublish = pr.DatePublish
                }).ToList();
    }

    private void Insert(ProductReview review)
    {
        GetDbSet().Add(review);
    }

    private void Update(ProductReview newReview, ProductReview oldReview)
    {
        newReview.Star = oldReview.Star;
        newReview.Review = oldReview.Review;
    }

    public void Upload(ProductReview review)
    {        
        var reviewFound = GetDbSet().FirstOrDefault(r => (r.Sku == review.Sku && r.UserId == review.UserId));
        if (reviewFound == null) Insert(review);
        else Update(reviewFound, review);
    }

    public void Delete(int id)
    {
        var productReview = GetDbSet().First(p => p.Id == id);
        GetDbSet().Remove(productReview);
    }
}