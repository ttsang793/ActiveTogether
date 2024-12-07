using Core.DTO;
using Core.Entity;
using Microsoft.AspNetCore.Http;
using System.Linq.Expressions;

namespace Core.Interface;

public interface IBlogRepository : IInsert<BlogArticle>, IUpdate<BlogArticle>, ILock, IUnlock, IUploadImage
{
    Task<IEnumerable<BlogReadDTO>> GetAllReadBlogs(Expression<Func<BlogArticle, bool>> expression = null);

    Task<IEnumerable<BlogReadDTO>> GetTop3Blogs();

    Task<BlogDetailReadDTO> GetByUrlAsync(string url);

    IEnumerable<BlogArticle> GetAllBlogs(Expression<Func<BlogArticle, bool>> expression = null);

    BlogArticle GetBlogById(int id);

    string[] GetBlogImageById(int id);

    Task<bool> UploadImages(IFormFile[] files, string id);
}