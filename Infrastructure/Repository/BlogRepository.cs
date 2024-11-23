using Core.Interface;
using Core.DTO;
using Core.Entity;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Repository;
public class BlogRepository : BaseRepository<BlogArticle>, IBlogRepository
{
    private readonly string _uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "..\\reactapp\\src\\Images\\blog");
    public BlogRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public async Task<IEnumerable<BlogReadDTO>> GetAllReadBlogs(Expression<Func<BlogArticle, bool>> expression = null)
    {
        var blogList = await ((expression == null) ?
            GetDbSet().Include(b => b.WrittenAdminNavigation).OrderByDescending(b => b.DatePublish).ToListAsync() :
            GetDbSet().Include(b => b.WrittenAdminNavigation).Where(expression).OrderByDescending(b => b.DatePublish).ToListAsync());

        return blogList.Select(b => new BlogReadDTO
        {
            Title = b.Title,
            Brief = b.Brief,
            UrlName = b.UrlName,
            Thumbnail = b.Thumbnail,
            WrittenAdmin = b.WrittenAdminNavigation!.FullName,
            DatePublish = b.DatePublish
        });
    }

    public async Task<IEnumerable<BlogReadDTO>> GetTop3Blogs()
    {
        return (await GetAllReadBlogs()).Take(2);
    }

    public async Task<BlogDetailReadDTO> GetByUrlAsync(string url)
    {
        var blog = (await GetAllAsync(b => b.UrlName == url)).First();

        return new BlogDetailReadDTO
        {
            Title = blog.Title,
            Brief = blog.Brief,
            WrittenAdmin = blog.WrittenAdminNavigation!.FullName,
            Content = blog.Content,
            DatePublish = blog.DatePublish
        };
    }

    public IEnumerable<BlogArticle> GetAllBlogs()
    {
        return GetDbSet().ToList();
    }
    
    public BlogArticle GetBlogById(int id)
    {
        return GetDbSet().First(b => b.Id == id);
    }

    public void Insert(BlogArticle blog)
    {
        blog.DatePublish = DateTime.Now;
        GetDbSet().Add(blog);
    }

    public void Update(BlogArticle blog)
    {      
        GetDbSet().Update(blog);
    }

    public void Lock(int id)
    {
        var blog = GetBlogById(id);
        blog.IsActive = false;
    }

    public void Unlock(int id)
    {
        var blog = GetBlogById(id);
        blog.IsActive = true;
    }

    public async Task<bool> UploadImage(IFormFile file, string id)
    {
        try
        {
            var fileName = "thumbnail_" + id + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(_uploadDirectory, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return true;
        }
        catch
        {
            return false;
        }
    }
}