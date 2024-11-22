using productservices.DTO;
using productservices.Data;
using productservices.Models;
using Microsoft.AspNetCore.Mvc;

namespace productservices.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
    private ILogger<OrderController> _logger;
    public OrderController(ILogger<OrderController> logger) { _logger = logger; }
    private AtWebContext _dbContext = new();

    [HttpGet("all")]
    public IEnumerable<OrderReadDTO> GetAllOrder()
    {
        var orderList = (from o in _dbContext.Orders
                         join a in _dbContext.AdminUsers on o.VertifyAdmin equals a.Id into adminGroup
                         from a in adminGroup.DefaultIfEmpty()
                         select new OrderReadDTO(o, a.FullName)).ToList();
        return orderList;
    }

    [HttpGet("alldetail")]
    public IEnumerable<BillDetailReadDTO> GetOrderDetail()
    {
        var orderDetails = (from o in _dbContext.OrderDetails
                             join d in _dbContext.ProductDetails on o.Sku equals d.Sku
                             join c in _dbContext.ProductColors on d.ProductColorId equals c.Id
                             join p in _dbContext.Products on c.ProductId equals p.Id
                             select new BillDetailReadDTO
                             {
                                 BillId = o.OrderId,
                                 Sku = o.Sku,
                                 Name = p.Name,
                                 Color = c.Color,
                                 Size = d.Size,
                                 Price = o.Price,
                                 Quantity = o.Quantity
                             }).ToList();
        return orderDetails;
    }

    [HttpPost("update")]
    public StatusCodeResult Update([Bind("Id", "VertifyAdmin", "Status")] OrderVertifyDTO or)
    {
        try
        {
            var order = _dbContext.Orders.First(o => o.Id == or.Id);
            order.Status = or.Status;
            if (or.Status == 1)
            {
                order.VertifyAdmin = or.VertifyAdmin;
                order.DateVertified = DateTime.Now;
            }
            _dbContext.SaveChanges();
            return StatusCode(200);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500);
        }
    }
}