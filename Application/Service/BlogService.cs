using Application.Interface;
using Core.DTO;
using Core.Interface;

namespace Application.Service;

public class BlogService : IBlogService
{
    private readonly IUnitOfWork _unitOfWork;

    public BlogService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<BlogReadDTO>> GetAllBlogs()
    {
        return await _unitOfWork.Blogs.GetAllBlogs();
    }
    
    public async Task<IEnumerable<BlogReadDTO>> GetTop3Blogs()
    {
        return await _unitOfWork.Blogs.GetTop3Blogs();
    }

    public async Task<BlogDetailReadDTO> GetByUrlAsync(string url)
    {
        return await _unitOfWork.Blogs.GetByUrlAsync(url);
    }
}
