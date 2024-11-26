using Application.Interface;
using Core.DTO;
using Core.Entity;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace UserView.Controllers;

[ApiController]
[Route("[controller]")]
public class OrderController : ControllerBase
{
    private readonly ILogger<OrderController> _logger;
    private readonly IOrderService _orderService;
    private readonly IVnPayService _vnPayService;

    public OrderController(ILogger<OrderController> logger, IOrderService orderService, IVnPayService vnPayService)
    {
        _logger = logger;
        _orderService = orderService;
        _vnPayService = vnPayService;
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

    [HttpPost("vnpay/payment")]
    [EnableCors("AllowVNPay")]
    public string CreateVNPayPayment([Bind("Username", "FullName", "Total")]OrderDTO o)
    {
        return _vnPayService.CreatePaymentUrl(o, HttpContext);
    }

    [HttpGet("vnpay/result")]
    [EnableCors("AllowVNPay")]
    public StatusCodeResult GetResult()
    {
        var response = _vnPayService.PaymentExecute(Request.Query);
        Console.WriteLine("Order description : ", response.OrderDescription);
        Console.WriteLine("Transaction id : ", response.TransactionId);
        Console.WriteLine("Order id : ", response.OrderId);
        Console.WriteLine("Payment method : ", response.PaymentMethod);
        Console.WriteLine("Payment id : ", response.PaymentId);
        Console.WriteLine("Success : ", response.Success);
        Console.WriteLine("Token : ", response.Token);
        Console.WriteLine("Reposnse Code : ", response.VnPayResponseCode);
        return (response.Success) ? Ok() : BadRequest();
}

    [HttpPost("add")]
    public async Task<StatusCodeResult> AddOrder([Bind("Username", "FullName", "Address", "Phone", "Email", "PaymentMethod", "Total", "OrderDetails")] OrderDTO o)
    {
        return (await _orderService.AddOrder(o)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("cancel")]
    public async Task<StatusCodeResult> CancelOrder(int id)
    {
        return (await _orderService.CancelOrder(id)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("receive")]
    public async Task<StatusCodeResult> ReceiveOrder(int id)
    {
        return (await _orderService.ReceiveOrder(id)) ? StatusCode(200) : StatusCode(404);
    }
}