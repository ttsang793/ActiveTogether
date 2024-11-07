using cartservices.Models;
using cartservices.Data;
using cartservices.DTO;
using Microsoft.AspNetCore.Mvc;

namespace cartservices.Controllers;

[Route("[controller]")]
[ApiController]
public class CartController : ControllerBase
{
    private readonly ILogger<CartController> _logger;
    public CartController(ILogger<CartController> logger) {  _logger = logger; }
    private readonly AtWebContext _dbContext = new();

    [HttpGet("")]
    public IEnumerable<CartDetailReadDTO> GetCartById(int id)
    {
        var cart = (from cd in _dbContext.CartDetails
                    join d in _dbContext.ProductDetails on cd.Sku equals d.Sku
                    join i in _dbContext.ProductImages on d.ProductColorId equals i.ProductColorId
                    join c in _dbContext.ProductColors on i.ProductColorId equals c.Id
                    join p in _dbContext.Products on c.ProductId equals p.Id
                    where cd.UserId == id
                    group new { cd, d, i, c, p } by cd.Sku into g
                    select new CartDetailReadDTO
                    {
                        Sku = g.Select(x => x.cd.Sku).First(),
                        Name = g.Select(x => x.p.Name).First(),
                        Price = g.Select(x => x.cd.Price).First(),
                        Quantity = g.Select(x => x.cd.Quantity).First(),
                        Color = g.Select(x => x.c.Color).First(),
                        Size = g.Select(x => x.d.Size).First(),
                        Image = g.Select(x => x.i.Image).First()!

                    }).ToList();
        return cart!;
    }

    private StatusCodeResult Add([Bind("UserId", "Sku", "Price", "Quantity")] CartDetailDTO cd)
    {
        if (ModelState.IsValid && cd != null)
        {
            _dbContext.CartDetails.Add(new CartDetail
            {
                UserId = cd.UserId,
                Sku = cd.Sku,
                Price = cd.Price,
                Quantity = cd.Quantity
            });
            _dbContext.SaveChanges();
            return StatusCode(200);
        }
        else return StatusCode(500);
    }

    [HttpPost("update")]
    public StatusCodeResult Update([Bind("UserId", "Sku", "Price", "Quantity")] CartDetailDTO cd, int userId, string sku)
    {
        var cartDetail = _dbContext.CartDetails.FirstOrDefault(cd => cd.UserId == userId && cd.Sku == sku);
        if (ModelState.IsValid && cartDetail != null)
        {
            cartDetail.Sku = cd.Sku;
            cartDetail.Price = cd.Price;
            cartDetail.Quantity = cd.Quantity;

            _dbContext.SaveChanges();
            return StatusCode(201);
        }
        else return Add(cd);
    }

    [HttpPost("delete")]
    public StatusCodeResult Delete(int userId, string sku)
    {
        var cartDetail = _dbContext.CartDetails.First(c => c.UserId == userId && c.Sku == sku);
        if (ModelState.IsValid && cartDetail != null)
        {
            _dbContext.Remove(cartDetail);
            _dbContext.SaveChanges();
            return StatusCode(201);
        }
        else return StatusCode(500);
    }

    internal bool ClearCart(int? userId, string sku)
    {
        try
        {
            var cartDetail = _dbContext.CartDetails.First(c => c.UserId == userId && c.Sku == sku);
            _dbContext.CartDetails.Remove(cartDetail);
            _dbContext.SaveChanges();
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }

    [HttpPost("deleteAll")]
    public StatusCodeResult DeleteAll(int userId)
    {
        var cartList = _dbContext.CartDetails.Where(cd => cd.UserId == userId);
        if (cartList.Count() > 0)
        {
            _dbContext.RemoveRange(cartList);
            _dbContext.SaveChanges();
            return StatusCode(201);
        }
        else return StatusCode(500);
    }
}
