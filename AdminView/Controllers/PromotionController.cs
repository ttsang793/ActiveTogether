using Application.Interface;
using Core.Entity;
using Microsoft.AspNetCore.Mvc;

namespace AdminView.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PromotionController : ControllerBase
{
    private readonly ILogger<PromotionController> _logger;
    private readonly IPromotionService _promotionService;
    public PromotionController(ILogger<PromotionController> logger, IPromotionService promotionService)
    {
        _logger = logger;
        _promotionService = promotionService;
    }

    [HttpGet("get")]
    public IEnumerable<Promotion> GetAllPromotions()
    {
        return _promotionService.GetAllPromotions();
    }

    [HttpGet("get/detail")]
    public IEnumerable<PromotionDetail> GetAllPromotionDetails()
    {
        return _promotionService.GetAllPromotionDetails();
    }
    
    [HttpPost("add")]
    public async Task<StatusCodeResult> Insert(Promotion promotion)
    {
        return (await _promotionService.Insert(promotion)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("update")]
    public async Task<StatusCodeResult> Update(Promotion promotion)
    {
        return (await _promotionService.Update(promotion)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("lock")]
    public async Task<StatusCodeResult> Lock(int id)
    {
        return (await _promotionService.Lock(id)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("unlock")]
    public async Task<StatusCodeResult> Unlock(int id)
    {
        return (await _promotionService.Unlock(id)) ? StatusCode(200) : StatusCode(404);
    }
}