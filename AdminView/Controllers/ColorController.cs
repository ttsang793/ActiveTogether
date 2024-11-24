using Application.Interface;
using Core.Entity;
using Microsoft.AspNetCore.Mvc;

namespace AdminView.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ColorController : ControllerBase
{
    private readonly ILogger<ColorController> _logger;
    private readonly IColorService _colorService;
    public ColorController(ILogger<ColorController> logger, IColorService colorService)
    {
        _logger = logger;
        _colorService = colorService;
    }

    [HttpGet("get")]
    public IEnumerable<Color> GetAllColors()
    {
        return _colorService.GetAllColors();
    }
    
    [HttpPost("save")]
    public async Task<StatusCodeResult> Save(Color color)
    {
        color.Code = "#" + color.Code[3..];
        sbyte result = await _colorService.Save(color);
        return (result == 0) ? StatusCode(200) : ((result == 1) ? StatusCode(201) : StatusCode(404));
    }

    [HttpPut("lock")]
    public async Task<StatusCodeResult> Lock(string code)
    {
        return (await _colorService.Lock(code)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("unlock")]
    public async Task<StatusCodeResult> Unlock(string code)
    {
        return (await _colorService.Unlock(code)) ? StatusCode(200) : StatusCode(404);
    }
}