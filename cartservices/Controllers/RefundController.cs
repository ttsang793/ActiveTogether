using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using cartservices.Models;
using cartservices.Data;
using cartservices.DTO;

namespace cartservices.Controllers;

[Route("[controller]")]
[ApiController]
public class RefundController : ControllerBase
{
    private readonly ILogger<CartController> _logger;
    public RefundController(ILogger<CartController> logger) { _logger = logger; }
    private readonly AtWebContext _dbContext = new();

    [HttpPost("request")]
    public StatusCodeResult RequestRefund([Bind("OrderDetailId", "Quantity", "Reason")] RefundRequestDTO refund)
    {
        _dbContext.Refunds.Add(new Refund
        {
            OrderDetailId = refund.OrderDetailId,
            Quantity = refund.Quantity,
            Price = refund.Price,
            Status = 0,
            Reason = refund.Reason
        });
        _dbContext.SaveChanges();
        return StatusCode(200);
    }
}
