using Application.Interface;
using Core.Entity;
using Core.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;

namespace AdminView.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StatisticController : ControllerBase
{
    private readonly ILogger<ProductController> _logger;
    private readonly IProductService _productService;
    private readonly IOrderService _orderService;

    public StatisticController(ILogger<ProductController> logger, IProductService productService, IOrderService orderService)
    {
        _logger = logger;
        _productService = productService;
        _orderService = orderService;
    }

    [HttpPost("product")]
    public async Task<IEnumerable<StatisticDTO>> ListBestSeller([Bind("DateStart", "DateEnd")] StatisticDateDTO duration)
    {
        DateTime dateEnd = DateTime.Now;
        if (!string.IsNullOrEmpty(duration.DateEnd)) dateEnd = DateTime.Parse(duration.DateEnd);
        return await _productService.ListBestSeller(duration.DateStart, dateEnd);
    }

    [HttpPost("brand")]
    public async Task<IEnumerable<StatisticDTO>> ListSaleByBrand([Bind("DateStart", "DateEnd")] StatisticDateDTO duration)
    {
        DateTime dateEnd = DateTime.Now;
        if (!string.IsNullOrEmpty(duration.DateEnd)) dateEnd = DateTime.Parse(duration.DateEnd);
        return await _productService.ListSaleByBrand(duration.DateStart, dateEnd);
    }

    [HttpPost("revenue")]
    public IEnumerable<OrderStatisticDTO> ListSaleRevenue([Bind("DateStart", "DateEnd")] StatisticDateDTO duration)
    {
        DateTime dateEnd = DateTime.Now;
        if (!string.IsNullOrEmpty(duration.DateEnd)) dateEnd = DateTime.Parse(duration.DateEnd);
        return _orderService.ListSaleRevenue(duration.DateStart, dateEnd);
    }
}
