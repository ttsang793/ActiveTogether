using Core.DTO;
using Core.Entity;
using System.Linq.Expressions;

namespace Core.Interface;

public interface IBlogRepository
{
    Task<IEnumerable<BlogReadDTO>> GetAllBlogs(Expression<Func<BlogArticle, bool>> expression = null);

    Task<IEnumerable<BlogReadDTO>> GetTop3Blogs();

    Task<BlogDetailReadDTO> GetByUrlAsync(string url);
}