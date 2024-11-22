using Core.Entity;
using Core.DTO;
using System.Linq.Expressions;

namespace Core.Interface;

public interface IRepository<T> where T : BaseDTO
{
    Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> expression = null);
}

public interface IInsert<T> where T : BaseEntity
{
    void Insert(T entity);
}

public interface IUpdate<T> where T : BaseEntity
{
    void Update(T entity);
}

public interface IDelete
{
    void Delete(int id);
}

public interface ILock
{
    void Lock(int id);
}

public interface IUnlock
{
    void Unlock(int id);
}

public interface IChangeStatus
{
    void ChangeStatus(int id, int status);
}