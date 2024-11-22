using Application.Interface;
using Core.Interface;

namespace Application.Service;

public class ServiceManager : IServiceManager
{
    private IBlogService? _blogService;
    private ICartService? _cartService;
    private IProductService? _productService;
    private IRefundService? _refundService;
    private IUserAddressService? _userAddressService;
    private IUserService? _userService;
    private readonly IUnitOfWork _unitOfWork;

    public ServiceManager(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public IBlogService Blogs => _blogService ??= new BlogService(_unitOfWork);

    public ICartService Carts => _cartService ??= new CartService(_unitOfWork);

    public IProductService Products => _productService ??= new ProductService(_unitOfWork);

    public IRefundService Refunds => _refundService ??= new RefundService(_unitOfWork);

    public IUserAddressService UserAddresses => _userAddressService ??= new UserAddressService(_unitOfWork);

    public IUserService userService => _userService ??= new UserService(_unitOfWork);

}