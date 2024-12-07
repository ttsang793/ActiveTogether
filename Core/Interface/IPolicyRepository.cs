using Core.DTO;
using Core.Entity;
using System.Linq.Expressions;

namespace Core.Interface;

public interface IPolicyRepository : IInsert<PolicyArticle>, IUpdate<PolicyArticle>, ILock, IUnlock
{
    Task<IEnumerable<PolicyReadDTO>> GetAllReadPolicies();

    Task<BlogDetailReadDTO> GetByUrlAsync(string url);

    IEnumerable<PolicyArticle> GetAllPolicies(Expression<Func<PolicyArticle, bool>> expression = null);

    PolicyArticle GetPolicyById(int id);
}