using Core.Interface;
using Core.DTO;
using Core.Entity;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infrastructure.Repository;
public class PolicyRepository : BaseRepository<PolicyArticle>, IPolicyRepository
{
    public PolicyRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public async Task<IEnumerable<PolicyReadDTO>> GetAllReadPolicies()
    {
        var policyList = await (from p in GetDbSet() where p.IsActive == true select new PolicyReadDTO { Title = p.Title, UrlName = p.UrlName }).ToListAsync();
        return policyList;
    }

    public async Task<BlogDetailReadDTO> GetByUrlAsync(string url)
    {
        var policy = (await GetDbSet().Where(p => p.UrlName == url).ToListAsync())[0];
        return new BlogDetailReadDTO
        {
            Title = policy.Title,
            Content = policy.Content,
            DatePublish = policy.DatePublish
        };
    }

    public IEnumerable<PolicyArticle> GetAllPolicies(Expression<Func<PolicyArticle, bool>> expression = null)
    {
      if (expression == null) return GetDbSet().ToList();
      else return GetDbSet().Where(expression).ToList();
    }
    
    public PolicyArticle GetPolicyById(int id)
    {
        return GetDbSet().First(b => b.Id == id);
    }

    public void Insert(PolicyArticle blog)
    {
        blog.DatePublish = DateTime.Now;
        GetDbSet().Add(blog);
    }

    public void Update(PolicyArticle blog)
    {      
        GetDbSet().Update(blog);
    }

    public void Lock(int id)
    {
        var blog = GetPolicyById(id);
        blog.IsActive = false;
    }

    public void Unlock(int id)
    {
        var blog = GetPolicyById(id);
        blog.IsActive = true;
    }
}