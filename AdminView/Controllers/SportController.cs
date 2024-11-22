using Application.Interface;
using Core.Entity;
using Microsoft.AspNetCore.Mvc;

namespace AdminView.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SportController : ControllerBase
{
    private readonly ILogger<SportController> _logger;
    private readonly ISportService _sportService;
    public SportController(ILogger<SportController> logger, ISportService sportService)
    {
        _logger = logger;
        _sportService = sportService;
    }

    [HttpGet("get")]
    public IEnumerable<Sport> GetAllSports()
    {
        return _sportService.GetAllSports();
    }
    
    [HttpPost("add")]
    public async Task<StatusCodeResult> Insert(Sport sport)
    {
        return (await _sportService.Insert(sport)) ? StatusCode(200) : StatusCode(404);
    }

    [HttpPut("update")]
    public async Task<StatusCodeResult> Update(Sport sport)
    {
        return (await _sportService.Update(sport)) ? StatusCode(200) : StatusCode(404);
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