using Application.Interface;
using Core.DTO;
using Core.Entity;
using Microsoft.AspNetCore.Mvc;

namespace UserView.Controllers;

[Route("[controller]")]
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
    public IEnumerable<Order> GetOrdersByUsername(string username)
    {
        return _orderService.GetOrdersByUsername(username);
    }

    [HttpGet("getDetails")]
    public IEnumerable<OrderDetailReadDTO> GetOrderDetailsByUsername(string username)
    {
        return _orderService.GetOrderDetailsByUsername(username);
    }

    [HttpPost("add")]
    public async Task<StatusCodeResult> AddOrder([Bind("Username", "FullName", "Address", "Phone", "Email", "Total", "OrderDetails")] OrderDTO o)
    {
        return (await _orderService.AddOrder(o)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPost("cancel")]
    public async Task<StatusCodeResult> CancelOrder(int id)
    {
        return (await _orderService.CancelOrder(id)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPost("receive")]
    public async Task<StatusCodeResult> ReceiveOrder(int id)
    {
        return (await _orderService.ReceiveOrder(id)) ? StatusCode(200) : StatusCode(404);
    }
}