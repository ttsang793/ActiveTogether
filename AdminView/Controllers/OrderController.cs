using Application.Interface;
using Core.DTO;
using Microsoft.AspNetCore.Mvc;

namespace AdminView.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
    private readonly ILogger<OrderController> _logger;
    private readonly IOrderService _orderService;

    public OrderController(ILogger<OrderController> logger, IOrderService orderService)
    {
        _logger = logger;
        _orderService = orderService;
    }

    [HttpGet("get")]
    public IEnumerable<OrderAdminDTO> GetAllOrders()
    {
        return _orderService.GetAllOrders();
    }

    [HttpGet("getDetail")]
    public IEnumerable<BillDetailAdminDTO> GetAllOrderDetails()
    {
        return _orderService.GetAllOrderDetails();
    }

    [HttpPut("changeStatus")]
    public async Task<StatusCodeResult> ChangeStatus([Bind("Id", "VertifyAdmin", "Status")] OrderVertifyDTO o)
    {
        return (await _orderService.ChangeStatus(o)) ? StatusCode(200) : StatusCode(404);
    }
}