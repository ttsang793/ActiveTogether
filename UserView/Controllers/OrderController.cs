using Application.Interface;
using Core.DTO;
using Core.Entity;
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
    private readonly IMomoService _momoService;

    public OrderController(ILogger<OrderController> logger, IOrderService orderService, IVnPayService vnPayService, IMomoService momoService)
    {
        _logger = logger;
        _orderService = orderService;
        _vnPayService = vnPayService;
        _momoService = momoService;
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
    public string CreateVnPayPayment([Bind("Username", "FullName", "Total")] OrderDTO o)
    {
        string url = _vnPayService.CreatePaymentUrl(o, HttpContext);
        return url;
    }

    [HttpGet("vnpay/result")]
    [EnableCors("AllowVNPay")]
    public IActionResult GetVnPayResult()
    {
        var response = _vnPayService.PaymentExecute(Request.Query);
        return Redirect($"http://localhost:5173/thanh-toan/hoan-tat?vnpaypd={response.PaymentId}");
    }

    [HttpPost("momo/payment")]
    public async Task<string> CreateMomoPayment([Bind("Username", "FullName", "Total")] OrderDTO o)
    {
        var response = await _momoService.CreatePaymentAsync(o);
        return response.PayUrl;
    }

    [HttpGet("momo/result")]
    public IActionResult GetMomoResult()
    {
        var response = _momoService.PaymentExecuteAsync(Request.Query);
        int paymentId = response.OrderId == null ? 0 : int.Parse(response.OrderId);
        return Redirect($"http://localhost:5173/thanh-toan/hoan-tat?momopd={paymentId}");
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