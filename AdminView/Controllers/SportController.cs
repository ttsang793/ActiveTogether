using Application.Interface;
using Core.Entity;
using Microsoft.AspNetCore.Mvc;

namespace AdminView.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SportController : ControllerBase
{
    private readonly ILogger<SportController> _logger;
    private static string name = "";
    private readonly ISportService _sportService;
    public SportController(ILogger<SportController> logger, ISportService sportService)
    {
        _logger = logger;
        _sportService = sportService;
    }

    [HttpGet("get")]
    public IEnumerable<Sport> GetAllSports()
    {
        return _sportService.GetAllSports(s => s.Id > 0);
    }

    [HttpGet("find")]
    public IEnumerable<Sport> GetAllSports(string name)
    {
        return _sportService.GetAllSports(s => s.Name.ToLower().Contains(name.ToLower()));
    }

    [HttpPost("add")]
    public async Task<StatusCodeResult> Insert(Sport sport)
    {
        name = sport.Name;
        return (await _sportService.Insert(sport)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("update")]
    public async Task<StatusCodeResult> Update(Sport sport)
    {
        name = sport.Name;
        return (await _sportService.Update(sport)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPost("image/upload")]
    public async Task<StatusCodeResult> UploadImage(IFormFile file)
    {
        return (await _sportService.UploadImage(file, name)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("lock")]
    public async Task<StatusCodeResult> Lock(int id)
    {
        return (await _sportService.Lock(id)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("unlock")]
    public async Task<StatusCodeResult> Unlock(int id)
    {
        return (await _sportService.Unlock(id)) ? StatusCode(200) : StatusCode(404);
    }
}