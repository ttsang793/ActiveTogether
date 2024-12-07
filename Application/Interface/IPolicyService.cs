using Core.DTO;
using Core.Entity;
using System.Linq.Expressions;

namespace Application.Interface;

public interface IPolicyService
{
    Task<IEnumerable<PolicyReadDTO>> GetAllReadPolicies();

    Task<BlogDetailReadDTO> GetByUrlAsync(string url);

    IEnumerable<PolicyArticle> GetAllPolicies(Expression<Func<PolicyArticle, bool>> expression = null);
    
    PolicyArticle GetPolicyById(int id);

    Task<bool> Insert(PolicyArticle blog);

    Task<bool> Update(PolicyArticle blog);

    Task<bool> Lock(int id);

    Task<bool> Unlock(int id);
}