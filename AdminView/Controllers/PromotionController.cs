using Application.Interface;
using Core.Entity;
using Core.DTO;
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

    [HttpGet("detail/get")]
    public IEnumerable<PromotionDetail> GetAllPromotionDetails()
    {
        return _promotionService.GetAllPromotionDetails();
    }
    
    [HttpPost("add")]
    public async Task<StatusCodeResult> Insert([Bind("Title", "DateStart", "DateEnd")]PromotionAdminDTO promotionDTO)
    {
        return (await _promotionService.Insert(promotionDTO)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("update")]
    public async Task<StatusCodeResult> Update([Bind("Id", "Title", "DateStart", "DateEnd")]PromotionAdminDTO promotionDTO)
    {
        return (await _promotionService.Update(promotionDTO)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPost("detail/save")]
    public async Task<StatusCodeResult> UpdateDetail([Bind("Id", "PromotionDetail")] Promotion promotion)
    {
        int id = promotion.Id;
        return (await _promotionService.UpdateDetail(id, promotion.PromotionDetails.ToList())) ? StatusCode(200) : StatusCode(404);
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