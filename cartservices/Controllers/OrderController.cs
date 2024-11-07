using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using cartservices.Models;
using cartservices.Data;
using cartservices.DTO;

namespace cartservices.Controllers;

[Route("[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
    private readonly ILogger<CartController> _logger;
    public OrderController(ILogger<CartController> logger) { _logger = logger; }
    private readonly AtWebContext _dbContext = new();

    [HttpGet("get")]
    public IEnumerable<Order> GetOrdersByUsername(string username)
    {
        var userId = _dbContext.Users.First(u => u.Username == username).Id;
        return _dbContext.Orders.Where(o => o.UserId == userId).OrderByDescending(o => o.Id);
    }

    [HttpGet("getDetails")]
    public IEnumerable<OrderDetailReadDTO> GetOrderDetailsByUsername(string username)
    {
        var userId = _dbContext.Users.First(u => u.Username == username).Id;
        return (from od in _dbContext.OrderDetails
                join r in _dbContext.Refunds on od.Id equals r.OrderDetailId into refundDetails
                from r in refundDetails.DefaultIfEmpty()
                join o in _dbContext.Orders on od.OrderId equals o.Id
                join d in _dbContext.ProductDetails on od.Sku equals d.Sku
                join i in _dbContext.ProductImages on d.ProductColorId equals i.ProductColorId
                join c in _dbContext.ProductColors on i.ProductColorId equals c.Id
                join p in _dbContext.Products on c.ProductId equals p.Id
                where o.UserId == userId
                group new { od, r, d, i, c, p } by od.Sku into g
                select new OrderDetailReadDTO
                {
                    Id = g.Select(x => x.od.Id).First(),
                    OrderId = g.Select(x => x.od.OrderId).First(),
                    Sku = g.Select(x => x.od.Sku).First(),
                    Name = g.Select(x => x.p.Name).First(),
                    Price = g.Select(x => x.od.Price).First(),
                    Quantity = g.Select(x => x.od.Quantity).First(),
                    Color = g.Select(x => x.c.Color).First(),
                    Size = g.Select(x => x.d.Size).First(),
                    Image = g.Select(x => x.i.Image).First()!,
                    RefundStatus = g.Select(x => x.r.Status).First()
                }).ToList();
    }

    [HttpPost("add")]
    public StatusCodeResult AddOrder([Bind("UserId", "Total", "OrderDetails")] OrderDTO o)
    {
        if (ModelState.IsValid)
        {
            _dbContext.Orders.Add(new Order
            {
                UserId = o.UserId,
                Total = o.Total,
                Point = (int)((o.UserId > 0) ? o.Total / 10000 : 0)!,
                DatePurchased = DateTime.Now,
                Status = 0
            });
            _dbContext.SaveChanges();

            int id = _dbContext.Orders.OrderByDescending(o => o.Id).First().Id;
            Console.WriteLine(id);            

            foreach (var od in o.OrderDetails)
            {
                _dbContext.OrderDetails.Add(new OrderDetail
                {
                    OrderId = id,
                    Sku = od.Sku,
                    Price = od.Price,
                    Quantity = od.Quantity
                });

                var productDetail = _dbContext.ProductDetails.Where(p => p.Sku == od.Sku).First();
                productDetail.Quantity -= od.Quantity;

                _dbContext.SaveChanges();

                new CartController(_logger).ClearCart(o.UserId, od.Sku);
            }

            return StatusCode(200);
        }
        else return StatusCode(500);
    }

    [HttpPost("cancel")]
    public StatusCodeResult CancelOrder(int id)
    {
        var order = _dbContext.Orders.First(o => o.Id == id);
        order.Status = -1;
        _dbContext.SaveChanges();
        return StatusCode(200);
    }

    [HttpPost("receive")]
    public StatusCodeResult ReceiveOrder(int id)
    {
        var order = _dbContext.Orders.First(o => o.Id == id);
        order.Status = 3;
        order.DateReceived = DateTime.Now;
        _dbContext.SaveChanges();
        return StatusCode(200);
    }
}