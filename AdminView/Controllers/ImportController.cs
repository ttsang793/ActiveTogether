using Application.Interface;
using Core.Entity;
using Core.DTO;
using Microsoft.AspNetCore.Mvc;

namespace AdminView.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ImportController : ControllerBase
{
    private readonly ILogger<ImportController> _logger;
    private readonly IImportService _importService;
    public ImportController(ILogger<ImportController> logger, IImportService importService)
    {
        _logger = logger;
        _importService = importService;
    }
    
    [HttpGet("get")]
    public IEnumerable<ImportReadDTO> GetAllImports()
    {
        return _importService.GetAllImports();
    }

    [HttpGet("get/detail")]
    public IEnumerable<BillDetailAdminDTO> GetAllImportDetails()
    {
        return _importService.GetAllImportDetails();
    }

    [HttpPost("add")]
    public async Task<bool> Insert([Bind("CheckAdmin", "Total", "ImportDetails")]Import im)
    {
        return await _importService.Insert(im);
    }
}