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
            Author = b.WrittenAdminNavigation!.FullName,
            Avatar = b.WrittenAdminNavigation!.Avatar,
            DatePublish = b.DatePublish
        });
    }

    public async Task<IEnumerable<BlogReadDTO>> GetTop3Blogs()
    {
        return (await GetAllReadBlogs()).Take(3);
    }

    public async Task<BlogDetailReadDTO> GetByUrlAsync(string url)
    {
        var blog = (await GetDbSet().Include(b => b.WrittenAdminNavigation).Where(u => u.UrlName == url).ToListAsync())[0];
        Console.WriteLine(blog.Title);

        return new BlogDetailReadDTO
        {
            Title = blog.Title,
            Brief = blog.Brief,
            Author = blog.WrittenAdminNavigation!.FullName,
            Avatar = blog.WrittenAdminNavigation!.Avatar,
            Content = blog.Content,
            DatePublish = blog.DatePublish
        };
    }

    public IEnumerable<BlogArticle> GetAllBlogs(Expression<Func<BlogArticle, bool>> expression = null)
    {
      if (expression == null) return GetDbSet().ToList();
      else return GetDbSet().Where(expression).ToList();
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