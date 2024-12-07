using Application.Interface;
using Core.Entity;
using Microsoft.AspNetCore.Mvc;

namespace UserView.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PolicyController : ControllerBase
{
    private readonly ILogger<PolicyController> _logger;
    private readonly IPolicyService _policyService;

    public PolicyController(ILogger<PolicyController> logger, IPolicyService policyService)
    {
        _logger = logger;
        _policyService = policyService;
    }

    [HttpGet("get")]
    public IEnumerable<PolicyArticle> GetAllPolicies()
    {
        return _policyService.GetAllPolicies();
    }

    [HttpGet("find")]
    public IEnumerable<PolicyArticle> GetAllPolicies(string title)
    {
        return _policyService.GetAllPolicies(p => p.Title.ToLower().Contains(title.ToLower()));
    }

    [HttpGet("get/detail")]
    public PolicyArticle GetPolicyById(int id)
    {
        return _policyService.GetPolicyById(id);
    }

    private string[] DataValidation(PolicyArticle policy, bool isUpdate)
    {

        bool errorFlag = false;
        string[] result = new string[4];

        if (string.IsNullOrEmpty(policy.Title))
        {
            errorFlag = true;
            result[0] = "Vui lòng nhập tiêu đề chính sách";
        }
        else if (!isUpdate && _policyService.GetAllPolicies(b => b.UrlName == policy.UrlName).Any())
        {
            errorFlag = true;
            result[0] = "Tiêu đề không được trùng với các chính sách khác";
        }
        else if (_policyService.GetAllPolicies(b => b.UrlName == policy.UrlName && b.Id != policy.Id).Any())
        {
            errorFlag = true;
            result[0] = "Tiêu đề không được trùng với các chính sách khác";
        }
        if (string.IsNullOrEmpty(policy.Title))
        {
            errorFlag = true;
            result[1] = "Vui lòng nhập nội dung của chính sách";
        }
        return errorFlag ? result : Array.Empty<string>();
    }

    [HttpPost("add")]
    public async Task<IActionResult> Insert(PolicyArticle policy)
    {
        string[] validationResult = DataValidation(policy, false);
        if (validationResult.Length > 0) return BadRequest(new { errors = validationResult });
        return (await _policyService.Insert(policy)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update(PolicyArticle policy)
    {
        string[] validationResult = DataValidation(policy, true);
        if (validationResult.Length > 0) return BadRequest(new { errors = validationResult });
        return (await _policyService.Update(policy)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("lock")]
    public async Task<StatusCodeResult> Lock(int id)
    {
        return (await _policyService.Lock(id)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("unlock")]
    public async Task<StatusCodeResult> Unlock(int id)
    {
        return (await _policyService.Unlock(id)) ? StatusCode(200) : StatusCode(404);
    }
}
