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

    [HttpGet("find")]
    public IEnumerable<Promotion> GetAllPromotions(string title)
    {
        return _promotionService.GetAllPromotions(p => p.Title.ToLower().Contains(title.ToLower()));
    }

    [HttpGet("detail/get")]
    public IEnumerable<PromotionDetail> GetAllPromotionDetails()
    {
        return _promotionService.GetAllPromotionDetails();
    }

    private string[] DataValidation(PromotionAdminDTO promotionDTO)
    {
        bool errorFlag = false;
        string[] result = new string[3];
        if (string.IsNullOrEmpty(promotionDTO.Title))
        {
            errorFlag = true;
            result[0] = "Vui lòng nhập tên chương trình khuyến mãi";
        }
        if (DateTime.Compare(DateTime.Parse(promotionDTO.DateStart), DateTime.Now) <= 0)
        {
            errorFlag = true;
            result[1] = "Ngày bắt đầu phải lớn hơn ngày hiện tại";
        }
        if (DateTime.Compare(DateTime.Parse(promotionDTO.DateEnd), DateTime.Now) <= 0)
        {
            errorFlag = true;
            result[2] = "Ngày kết thúc phải lớn hơn ngày hiện tại";
        }
        if (DateTime.Compare(DateTime.Parse(promotionDTO.DateStart), DateTime.Parse(promotionDTO.DateEnd)) >= 0)
        {
            errorFlag = true;
            result[2] = "Ngày kết thúc phải nhỏ hơn ngày bắt đầu";
        }
        return errorFlag ? result : Array.Empty<string>();
    }
    
    [HttpPost("add")]
    public async Task<ActionResult> Insert([Bind("Title", "DateStart", "DateEnd")]PromotionAdminDTO promotionDTO)
    {
        string[] validationResult = DataValidation(promotionDTO);
        if (validationResult.Length > 0) return BadRequest(new { errors = validationResult });
        return (await _promotionService.Insert(promotionDTO)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("update")]
    public async Task<ActionResult> Update([Bind("Id", "Title", "DateStart", "DateEnd")]PromotionAdminDTO promotionDTO)
    {
        string[] validationResult = DataValidation(promotionDTO);
        if (validationResult.Length > 0) return BadRequest(new { errors = validationResult });
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