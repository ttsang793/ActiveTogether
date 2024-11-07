using Microsoft.AspNetCore.Mvc;
using productservices.Models;
using productservices.DTO;
using productservices.Data;

namespace productservices.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ImportController : ControllerBase
{
    private ILogger<ImportController> _logger;
    public ImportController(ILogger<ImportController> logger) { _logger = logger; }
    private AtWebContext _dbContext = new AtWebContext();

    [HttpGet("all")]
    public IEnumerable<ImportReadDTO> GetAllImports()
    {
        var importList = (from i in _dbContext.Imports
                          join au in _dbContext.AdminUsers on i.CheckAdmin equals au.Id
                          select new ImportReadDTO
                          {
                              Id = i.Id,
                              DateImport = i.DateImport,
                              CheckAdmin = i.CheckAdmin,
                              AdminName = au.FullName,
                              Total = i.Total
                          }).ToList();
        return importList;
    }

    [HttpGet("alldetails")]
    public IEnumerable<BillDetailReadDTO> GetAllImportDetails()
    {
        var importDetails = (from i in _dbContext.ImportDetails
                             join d in _dbContext.ProductDetails on i.Sku equals d.Sku
                             join c in _dbContext.ProductColors on d.ProductColorId equals c.Id
                             join p in _dbContext.Products on c.ProductId equals p.Id
                             select new BillDetailReadDTO
                             {
                                 BillId = i.ImportId,
                                 Sku = i.Sku,
                                 Name = p.Name,
                                 Color = c.Color,
                                 Size = d.Size,
                                 Price = i.Price,
                                 Quantity = i.Quantity
                             }).ToList();
        return importDetails;
    }

    [HttpPost("add")]
    public StatusCodeResult Add([Bind("Total", "Importdetails")] ImportDTO im)
    {
        if (ModelState.IsValid)
        {
            _dbContext.Imports.Add(new Import { CheckAdmin = im.CheckAdmin, DateImport = DateTime.Now, Total = im.Total });
            _dbContext.SaveChanges();

            int id = _dbContext.Imports.OrderByDescending(p =>  p.Id).First().Id;

            foreach (var imDetail in im.ImportDetails)
            {
                _dbContext.ImportDetails.Add(new ImportDetail
                {
                    ImportId = id,
                    Sku = imDetail.Sku,
                    Quantity = imDetail.Quantity,
                    Price = imDetail.Price
                });

                var productDetail = _dbContext.ProductDetails.First(p => p.Sku == imDetail.Sku);
                productDetail.Quantity += imDetail.Quantity;
                _dbContext.SaveChanges();
            }

            return StatusCode(201);
        }
        else return StatusCode(500);
    }
}
