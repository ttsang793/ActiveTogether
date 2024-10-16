using Microsoft.AspNetCore.Mvc;
using productservices.Models;

namespace productservices.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SportController : ControllerBase
{
    private ILogger<SportController> _logger;
    public SportController(ILogger<SportController> logger) { _logger = logger; }
    private AtWebContext _dbContext = new AtWebContext();

    [HttpGet]
    [Route("All")]
    public IEnumerable<Sport> GetAllSports()
    {
        return _dbContext.Sports.AsEnumerable().ToArray();
    }

    [HttpPost]
    [Route("Add")]
    public StatusCodeResult Add([Bind("Name")] Sport s)
    {
        if (ModelState.IsValid)
        {
            _dbContext.Sports.Add(new Sport { Name = s.Name });
            _dbContext.SaveChanges();
            return StatusCode(201);
        }
        else return StatusCode(500);
    }

    [HttpPost]
    [Route("Update")]
    public StatusCodeResult Update([Bind("Name")] Sport s, int id)
    {
        var sport = _dbContext.Sports.FirstOrDefault(s => s.Id == id);
        if (sport != null && ModelState.IsValid)
        {
            sport.Name = s.Name;
            _dbContext.SaveChanges();
            return StatusCode(201);
        }
        else return StatusCode(500);
    }

    [HttpPost]
    [Route("Delete")]
    public StatusCodeResult Delete(int id)
    {
        var sport = _dbContext.Sports.FirstOrDefault(s => s.Id == id);
        if (sport != null)
        {
            _dbContext.Remove(sport);
            _dbContext.SaveChanges();
            return StatusCode(201);
        }
        else return StatusCode(500);
    }
}