using Application.Interface;
using Core.Entity;
using Core.DTO;
using Microsoft.AspNetCore.Mvc;
using Application.Service;

namespace AdminView.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PromotionDetailController : ControllerBase
{
    private readonly ILogger<PromotionDetailController> _logger;
    private readonly IPromotionDetailService _promotionDetailService;
    public PromotionDetailController(ILogger<PromotionDetailController> logger, IPromotionDetailService promotionDetailService)
    {
        _logger = logger;
        _promotionDetailService = promotionDetailService;
    }

    [HttpGet("get")]
    public async Task<IEnumerable<PromotionDetail>> GetPromotionDetailsByPromotionId(int id)
    {
        return await _promotionDetailService.GetAllPromotionDetails(p => p.PromotionId == id);
    }

    [HttpPost("update")]
    public async Task<IActionResult> Update([Bind("Id", "PromotionDetails")] PromotionDetailAdminDTO p)
    {
        return (await _promotionDetailService.Update(p.PromotionDetails, p.Id)) ? Ok() : BadRequest();
    }
}
