using Application.Interface;
using Core.DTO;
using Microsoft.AspNetCore.Mvc;

[Route("[controller]")]
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
	
	[HttpPost("request")]

    public async Task<bool> RequestRefund([Bind("OrderDetailId", "Quantity", "Reason")] RefundRequestDTO refund)
    {
		return await _refundService.RequestRefund(refund);
    }
}