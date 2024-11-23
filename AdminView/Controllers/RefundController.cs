using Application.Interface;
using Core.DTO;
using Microsoft.AspNetCore.Mvc;

namespace UserView.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RefundController : ControllerBase
{
    private readonly ILogger<RefundController> _logger;
    private readonly IRefundService _refundService;

    public RefundController(ILogger<RefundController> logger, IRefundService refundService)
    {
        _logger = logger;
        _refundService = refundService;
    }

    [HttpGet("get")]
    public IEnumerable<RefundReadAdminDTO> GetRefunds()
    {
        return _refundService.GetRefunds();
    }
	
	[HttpPut("changeStatus")]
    public async Task<StatusCodeResult> UpdateStatus(RefundUpdateAdminDTO r, bool updateQuantity)
    {
        return (await _refundService.UpdateStatus(r, updateQuantity)) ? StatusCode(200) : StatusCode(404);
    }
}