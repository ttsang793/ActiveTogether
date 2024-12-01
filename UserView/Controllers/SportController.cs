using Application.Interface;
using Core.Entity;
using Microsoft.AspNetCore.Mvc;

namespace UserView.Controllers;

[Route("[controller]")]
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
        return _sportService.GetAllSports(s => s.Id > 0);
    }
}