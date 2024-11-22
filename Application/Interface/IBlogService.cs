using Core.DTO;
using System.Linq.Expressions;

namespace Application.Interface;

public interface IBlogService
{
    Task<IEnumerable<BlogReadDTO>> GetAllBlogs();

    Task<IEnumerable<BlogReadDTO>> GetTop3Blogs();

    Task<BlogDetailReadDTO> GetByUrlAsync(string url);
}