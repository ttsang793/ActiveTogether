using Application.Interface;
using Core.DTO;
using Microsoft.AspNetCore.Mvc;

namespace UserView.Controllers;

[Route("[controller]")]
[ApiController]
public class CartController : ControllerBase
{
    private readonly ILogger<CartController> _logger;
    private readonly ICartService _cartService;

    public CartController(ILogger<CartController> logger, ICartService cartService)
    {
        _logger = logger;
        _cartService = cartService;
    }
    
    [HttpGet("get")]
    public async Task<IEnumerable<CartDetailReadDTO>> GetCartByUsername(string username)
    {
		return await _cartService.GetCartByUsername(username);
    }
    
    [HttpPost("add")]
    public async Task<StatusCodeResult> Add([Bind("Username", "Sku", "Price", "Quantity")] CartDetailDTO cd)
	{
		return (await _cartService.Add(cd)) ? StatusCode(200) : StatusCode(404);
	}
    
    [HttpPut("update")]
    public async Task<StatusCodeResult> Update([Bind("Username", "Sku", "Price", "Quantity")] CartDetailDTO cd)
	{
		return (await _cartService.Update(cd)) ? StatusCode(200) : StatusCode(404);
	}

    [HttpDelete("delete")]
    public async Task<StatusCodeResult> Delete(string username, string sku)
	{
		return (await _cartService.Delete(username, sku)) ? StatusCode(200) : StatusCode(404);
	}

    [HttpDelete("deleteAll")]
    public async Task<StatusCodeResult> DeleteAll(string username)
	{
		return (await _cartService.DeleteAll(username)) ? StatusCode(200) : StatusCode(404);
	}
}
