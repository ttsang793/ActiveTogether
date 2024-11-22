using Core.Entity;

namespace Application.Interface;

public interface IBrandService
{
    IEnumerable<Brand> GetAllBrands();

    Task<bool> Insert(Brand brand);

    Task<bool> Update(Brand brand);

    Task<bool> Lock(int id);

    Task<bool> Unlock(int id);
}