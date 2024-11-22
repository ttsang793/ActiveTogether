using Core.Interface;
using Core.DTO;
using Core.Entity;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Linq;

namespace Infrastructure.Repository;
public class BlogRepository : BaseRepository<BlogArticle>, IBlogRepository
{
    public BlogRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public async Task<IEnumerable<BlogReadDTO>> GetAllBlogs(Expression<Func<BlogArticle, bool>> expression = null)
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
        return (await GetAllBlogs()).Take(2);
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
}