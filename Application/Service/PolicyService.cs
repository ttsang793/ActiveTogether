using Application.Interface;
using Core.DTO;
using Core.Entity;
using Core.Interface;
using System.Linq.Expressions;

namespace Application.Service;

public class PolicyService : IPolicyService
{
    private readonly IUnitOfWork _unitOfWork;

    public PolicyService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<PolicyReadDTO>> GetAllReadPolicies()
    {
        return await _unitOfWork.Policies.GetAllReadPolicies();
    }

    public async Task<BlogDetailReadDTO> GetByUrlAsync(string url)
    {
        return await _unitOfWork.Policies.GetByUrlAsync(url);
    }

    public IEnumerable<PolicyArticle> GetAllPolicies(Expression<Func<PolicyArticle, bool>> expression = null)
    {
        return _unitOfWork.Policies.GetAllPolicies(expression);
    }

    public PolicyArticle GetPolicyById(int id)
    {
        return _unitOfWork.Policies.GetPolicyById(id);
    }

    public async Task<bool> Insert(PolicyArticle policy)
    {
        _unitOfWork.Policies.Insert(policy);
        return (await _unitOfWork.SaveChangesAsync());
    }

    public async Task<bool> Update(PolicyArticle policy)
    {
        _unitOfWork.Policies.Update(policy);
        return (await _unitOfWork.SaveChangesAsync());
    }

    public async Task<bool> Lock(int id)
    {
        _unitOfWork.Policies.Lock(id);
        return (await _unitOfWork.SaveChangesAsync());
    }

    public async Task<bool> Unlock(int id)
    {
        _unitOfWork.Policies.Unlock(id);
        return (await _unitOfWork.SaveChangesAsync());
    }
}
