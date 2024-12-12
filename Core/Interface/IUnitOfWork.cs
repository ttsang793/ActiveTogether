namespace Core.Interface;

public interface IUnitOfWork
{
    IAdminUserRepository AdminUsers { get; }
    IBlogRepository Blogs { get; }
    IBrandRepository Brands { get; }
    ICartRepository Carts { get; }
    ICategoryRepository Categories { get; }
    IColorRepository Colors { get; }
    IImportRepository Imports { get; }
    IOrderRepository Orders { get; }
    IPolicyRepository Policies { get; }
    IProductRepository Products { get; }
    IProductColorRepository ProductColors { get; }
    IProductDetailRepository ProductDetails { get; }
    IProductHistoryRepository ProductHistories { get; }
    IProductReviewRepository ProductReviews { get; }
    IPromotionRepository Promotions { get; }
    IPromotionDetailRepository PromotionDetails { get; }
    IRefundRepository Refunds { get; }
    IRoleRepository Roles { get; }
    IRolePermissionRepository RolePermissions { get; }
    ISportRepository Sports { get; }
    IUserAddressRepository UserAddresses { get; }
    IUserRepository Users { get; }
    Task<bool> SaveChangesAsync(CancellationToken cancellationToken = default);
}
