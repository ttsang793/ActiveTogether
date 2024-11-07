using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using productservices.Data;
using productservices.DTO;
using productservices.Models;

namespace productservices.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RefundController : ControllerBase
{
    private ILogger<RefundController> _logger;
    public RefundController(ILogger<RefundController> logger) { _logger = logger; }
    private AtWebContext _dbContext = new();

    [HttpGet("get")]
    public IEnumerable<RefundReadDTO> GetRefunds()
    {
        return (from r in _dbContext.Refunds
                join od in _dbContext.OrderDetails on r.OrderDetailId equals od.Id
                join o in _dbContext.Orders on od.OrderId equals o.Id
                join d in _dbContext.ProductDetails on od.Sku equals d.Sku
                join c in _dbContext.ProductColors on d.ProductColorId equals c.Id
                join p in _dbContext.Products on c.ProductId equals p.Id
                orderby r.Id descending
                select new RefundReadDTO
                {
                    OrderId = o.Id,
                    OrderDetailId = od.Id,
                    Sku = od.Sku,
                    Name = p.Name,
                    Color = c.Color,
                    Size = d.Size,
                    Price = od.Price,
                    Quantity = r.Quantity,
                    Reason = r.Reason,
                    Status = r.Status
                }).ToList();
    }

    private bool UpdateQuantity(string sku, int? quantity)
    {
        var product = _dbContext.ProductDetails.First(pd => pd.Sku == sku);
        product.Quantity += quantity;
        _dbContext.SaveChanges();
        return true;
    }

    private bool AddOrder(RefundUpdateDTO r)
    {
        decimal? newPrice = _dbContext.ProductDetails.First(p => p.Sku == r.Sku).Price * r.Quantity;
        decimal? newTotal = newPrice * r.Quantity;
        int? userId = _dbContext.Orders.First(o => o.Id == r.OrderId).UserId;
        
        if (ModelState.IsValid)
        {
            _dbContext.Orders.Add(new Order
            {
                UserId = userId,
                Total = (newTotal >= r.Price * r.Quantity) ? 0 : newTotal - r.Price * r.Quantity,
                Point = (int)((userId > 0) ? newTotal / 10000 : 0)!,
                DatePurchased = DateTime.Now,
                DateVertified = DateTime.Now,
                Status = 1,
                VertifyAdmin = r.VertifyAdmin
            });
            _dbContext.SaveChanges();

            int id = _dbContext.Orders.OrderByDescending(o => o.Id).First().Id;

            _dbContext.OrderDetails.Add(new OrderDetail
            {
                OrderId = id,
                Sku = r.Sku!,
                Price = (newPrice >= r.Price) ? 0 : newPrice - r.Price,
                Quantity = r.Quantity
            });

            _dbContext.SaveChanges();
            return true;
        }
        else return false;
    }

    [HttpPost("update")]
    public StatusCodeResult UpdateStatus(RefundUpdateDTO r, int updateQuantity)
    {
        var refund = _dbContext.Refunds.First(od => od.OrderDetailId == r.OrderDetailId);
        refund.Status = r.Status;
        refund.DateRefund = DateTime.Now;
        refund.CheckAdmin = r.VertifyAdmin;

        if (r.Status == -1) refund.Price = 0;
        if (r.Status == 1 && updateQuantity == 1) UpdateQuantity(r.Sku, r.Quantity);
        else if (r.Status == 2) AddOrder(r);

        _dbContext.SaveChanges();
        return StatusCode(200);
    }
}
