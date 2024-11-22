using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using productservices.Data;
using productservices.DTO;
using productservices.Models;

namespace productservices.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PromotionController : ControllerBase
{
    private ILogger<PromotionController> _logger;
    public PromotionController(ILogger<PromotionController> logger) { _logger = logger; }
    private AtWebContext _dbContext = new();

    [HttpGet("get")]
    public IEnumerable<Promotion> GetPromotions()
    {
        return _dbContext.Promotions.ToList();
    }

    [HttpGet("get/detail")]
    public IEnumerable<PromotionDetail> GetPromotionDetailById(int id)
    {
        return _dbContext.PromotionDetails.Where(d => d.Id == id).ToList();
    }

    /*
    private void UpdateProduct(List<ProductDetail> productDetails, DateTime? dateStart, DateTime? dateEnd, float? percent)
    {
        foreach (var pd in productDetails)
        {
            pd.DateEnd = dateEnd;

            _dbContext.Add(new ProductDetail
            {
                Sku = pd.Sku,
                ProductColorId = pd.ProductColorId,
                Size = pd.Size,
                Price = Math.Round((decimal)(pd.Price * (decimal)(1 - percent)), -3),
                OldPrice = pd.Price,
                Quantity = 0,
                Note = pd.Note,
                DateStart = dateStart,
                DateEnd = dateEnd
            });

            _dbContext.SaveChanges();
        }
    }*/
    
    [HttpPost("add")]
    public StatusCodeResult AddPromotion([Bind("Title", "Description", "DateStart", "DateEnd", "PromotionDetails")]PromotionDTO pr)
    {
        _dbContext.Promotions.Add(new Promotion { 
            Title = pr.Title, Description = pr.Description,
            DateStart = pr.DateStart, DateEnd = pr.DateEnd
        });
        _dbContext.SaveChanges();

        int id = _dbContext.Promotions.OrderByDescending(p => p.Id).First().Id;
        foreach (var pd in pr.PromotionDetails)
        {
            _dbContext.PromotionDetails.Add(new PromotionDetail
            {
                PromotionId = id,
                ProductId = pd.ProductId,
                Percent = pd.Percent
            });
            var productDetails = (from d in _dbContext.ProductDetails
                                  join c in _dbContext.ProductColors on d.ProductColorId equals c.Id
                                  join p in _dbContext.Products on c.ProductId equals p.Id
                                  where p.Id == pd.ProductId
                                  select d).ToList();
            foreach (var product in productDetails)
            {
                product.Note = pr.Title;
                product.DateEnd = ((DateTime)pr.DateStart!).AddDays(-1);
            }
            _dbContext.SaveChanges();
        }

        return StatusCode(200);
    }
}
