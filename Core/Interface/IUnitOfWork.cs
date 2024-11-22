namespace Core.Interface;

public interface IUnitOfWork
{
    IBlogRepository Blogs { get; }
    ICartRepository Carts { get; }
    IOrderRepository Orders { get; }
    IProductRepository Products { get; }
    IProductDetailRepository ProductDetails { get; }
    IProductReviewRepository ProductReviews { get; }
    IRefundRepository Refunds { get; }
    IUserAddressRepository UserAddresses { get; }
    IUserRepository Users { get; }
    Task<bool> SaveChangesAsync(CancellationToken cancellationToken = default);
}
