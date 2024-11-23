namespace Core.Interface;

public interface IUnitOfWork
{
    IBlogRepository Blogs { get; }
    IBrandRepository Brands { get; }
    ICartRepository Carts { get; }
    ICategoryRepository Categories { get; }
    IColorRepository Colors { get; }
    IImportRepository Imports { get; }
    IOrderRepository Orders { get; }
    IProductRepository Products { get; }
    IProductDetailRepository ProductDetails { get; }
    IProductReviewRepository ProductReviews { get; }
    IPromotionRepository Promotions { get; }
    IRefundRepository Refunds { get; }
    ISportRepository Sports { get; }
    IUserAddressRepository UserAddresses { get; }
    IUserRepository Users { get; }
    Task<bool> SaveChangesAsync(CancellationToken cancellationToken = default);
}
