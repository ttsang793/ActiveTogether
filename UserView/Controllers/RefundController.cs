using Application.Interface;
using Core.DTO;
using Microsoft.AspNetCore.Mvc;

namespace UserView.Controllers;

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
    public async Task<StatusCodeResult> RequestRefund([Bind("OrderId", "OrderDetailId", "Price", "Quantity", "Reason")] RefundRequestDTO refund)
    {
        if (await _refundService.StillInWaranty(refund.OrderId, refund.OrderDetailId) == false)
            return StatusCode(400);
        return (await _refundService.RequestRefund(refund)) ? StatusCode(200) : StatusCode(404);
    }
}