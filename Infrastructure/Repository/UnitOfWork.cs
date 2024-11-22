using Core.Interface;
using Infrastructure.Data;

namespace Infrastructure.Repository;
public class UnitOfWork : IUnitOfWork
{
    private readonly AtWebContext _dbContext;
    private IBlogRepository? _blogRepository;
    private IBrandRepository? _brandRepository;
    private ICartRepository? _cartRepository;
    private ICategoryRepository? _categoryRepository;
    private IColorRepository? _colorRepository;
    private IOrderRepository? _orderRepository;
    private IProductRepository? _productRepository;
    private IProductDetailRepository? _productDetailRepository;
    private IProductReviewRepository? _productReviewRepository;
    private IRefundRepository? _refundRepository;
    private ISportRepository? _sportRepository;
    private IUserAddressRepository? _userAddressRepository;
    private IUserRepository? _userRepository;

    public UnitOfWork(AtWebContext dbContext)
    {
        _dbContext = dbContext;
    }

    public IBrandRepository Brands => _brandRepository ??= new BrandRepository(_dbContext);
    public IBlogRepository Blogs => _blogRepository ??= new BlogRepository(_dbContext);    
    public ICartRepository Carts => _cartRepository ??= new CartRepository(_dbContext);
    public ICategoryRepository Categories => _categoryRepository ??= new CategoryRepository(_dbContext);
    public IColorRepository Colors => _colorRepository ??= new ColorRepository(_dbContext);
    public IOrderRepository Orders => _orderRepository ??= new OrderRepository(_dbContext);
    public IProductRepository Products => _productRepository ??= new ProductRepository(_dbContext);
    public IProductDetailRepository ProductDetails => _productDetailRepository ??= new ProductDetailRepository(_dbContext);
    public IProductReviewRepository ProductReviews => _productReviewRepository ??= new ProductReviewRepository(_dbContext);
    public IRefundRepository Refunds => _refundRepository ??= new RefundRepository(_dbContext);
    public ISportRepository Sports => _sportRepository ??= new SportRepository(_dbContext);

    public IUserAddressRepository UserAddresses => _userAddressRepository ??= new UserAddressRepository(_dbContext);
    public IUserRepository Users => _userRepository ??= new UserRepository(_dbContext);

    public async Task<bool> SaveChangesAsync(CancellationToken cancellationToken)
    {
        return await _dbContext.SaveChangesAsync(cancellationToken) > 0;
    }
}