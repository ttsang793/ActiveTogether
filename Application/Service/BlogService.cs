using Application.Interface;
using Core.DTO;
using Core.Entity;
using Core.Interface;
using Microsoft.AspNetCore.Http;
using System.Linq.Expressions;

namespace Application.Service;

public class BlogService : IBlogService
{
    private readonly IUnitOfWork _unitOfWork;

    public BlogService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<BlogReadDTO>> GetAllReadBlogs()
    {
        return await _unitOfWork.Blogs.GetAllReadBlogs();
    }
    
    public async Task<IEnumerable<BlogReadDTO>> GetTop3Blogs()
    {
        return await _unitOfWork.Blogs.GetTop3Blogs();
    }

    public async Task<BlogDetailReadDTO> GetByUrlAsync(string url)
    {
        return await _unitOfWork.Blogs.GetByUrlAsync(url);
    }

    public IEnumerable<BlogArticle> GetAllBlogs(Expression<Func<BlogArticle, bool>> expression = null)
    {
        return _unitOfWork.Blogs.GetAllBlogs(expression);
    }

    public BlogArticle GetBlogById(int id)
    {
        return _unitOfWork.Blogs.GetBlogById(id);
    }

    public async Task<bool> Insert(BlogArticle blog)
    {
        _unitOfWork.Blogs.Insert(blog);
        return (await _unitOfWork.SaveChangesAsync());
    }

    public async Task<bool> Update(BlogArticle blog)
    {
        _unitOfWork.Blogs.Update(blog);
        return (await _unitOfWork.SaveChangesAsync());
    }

    public async Task<bool> UploadImage(IFormFile file, string name)
    {
        return (await _unitOfWork.Blogs.UploadImage(file, name));
    }

    public async Task<bool> Lock(int id)
    {
        _unitOfWork.Blogs.Lock(id);
        return (await _unitOfWork.SaveChangesAsync());
    }

    public async Task<bool> Unlock(int id)
    {
        _unitOfWork.Blogs.Unlock(id);
        return (await _unitOfWork.SaveChangesAsync());
    }
}
