using Application.Interface;
using Core.DTO;
using Microsoft.AspNetCore.Mvc;

namespace UserView.Controllers;

[Route("[controller]")]
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
    public async Task<IEnumerable<PolicyReadDTO>> GetAllReadPolicies()
    {
        return await _policyService.GetAllReadPolicies();
    }

    [HttpGet("get/detail")]
    public async Task<BlogDetailReadDTO> GetByUrlAsync(string url)
    {
        return await _policyService.GetByUrlAsync(url);
    }
}
