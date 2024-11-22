using Application.Interface;
using Core.Entity;
using Core.Interface;

namespace Application.Service;

public class CategoryService : ICategoryService
{
    private readonly IUnitOfWork _unitOfWork;

    public CategoryService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public IEnumerable<Category> GetAllCategories()
    {
        return _unitOfWork.Categories.GetAllCategories();
    }

    public async Task<bool> Insert(Category category)
    {
        _unitOfWork.Categories.Insert(category);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> Update(Category category)
    {
        _unitOfWork.Categories.Update(category);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> Lock(int id)
    {
        _unitOfWork.Categories.Lock(id);
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> Unlock(int id)
    {
        _unitOfWork.Categories.Unlock(id);
        return await _unitOfWork.SaveChangesAsync();
    }
}