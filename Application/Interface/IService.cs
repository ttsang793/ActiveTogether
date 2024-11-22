using Core.DTO;
using System.Linq.Expressions;

namespace Application.Interface;

public interface IServiceManager
{
    IBlogService Blogs { get; }
    ICartService Carts { get; }

    IProductService Products { get; }

    IRefundService Refunds { get; }

    IUserAddressService UserAddresses { get; }

    IUserService userService { get; }
}

public interface IGet<T> where T : BaseDTO
{
    Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> expression = null);

    Task<T> GetByIdAsync(int id);
}

public interface IInsert<T> where T : BaseDTO
{
    Task<bool> Insert(T entity);
}

public interface IUpdate<T> where T : BaseDTO
{
    Task<bool> Update(T entity);
}

public interface IDelete
{
    Task<bool> Delete(int id);
}

public interface ILock
{
    Task<bool> Lock(int id);
}

public interface IUnlock
{
    Task<bool> Unlock(int id);
}

public interface IChangeStatus
{
    Task<bool> ChangeStatus(int id, int status);
}