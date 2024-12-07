using Core.DTO;
using Core.Entity;
using Microsoft.AspNetCore.Http;
using System.Linq.Expressions;

namespace Application.Interface;

public interface IBlogService
{
    Task<IEnumerable<BlogReadDTO>> GetAllReadBlogs();

    Task<IEnumerable<BlogReadDTO>> GetTop3Blogs();

    Task<BlogDetailReadDTO> GetByUrlAsync(string url);

    IEnumerable<BlogArticle> GetAllBlogs(Expression<Func<BlogArticle, bool>> expression = null);
    
    BlogArticle GetBlogById(int id);

    string[] GetBlogImageById(int id);

    Task<bool> Insert(BlogArticle blog);

    Task<bool> Update(BlogArticle blog);

    Task<bool> UploadImage(IFormFile file, string id);

    Task<bool> UploadImages(IFormFile[] file, string name);

    Task<bool> Lock(int id);

    Task<bool> Unlock(int id);
}