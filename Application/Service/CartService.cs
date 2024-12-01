using Application.Interface;
using Core.DTO;
using Core.Entity;
using Core.Interface;
using System.Linq.Expressions;

namespace Application.Service;

public class CartService : ICartService
{
    private readonly IUnitOfWork _unitOfWork;

    public CartService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<CartDetailReadDTO>> GetCartByUsername(string username)
    {
		return await _unitOfWork.Carts.GetCartByUsername(username);
    }

    public async Task<bool> Add(CartDetailDTO cd)
	{
		CartDetail cart = new CartDetail
        {
            UserId = await _unitOfWork.Users.GetUserIdByUsername(cd.Username),
            Sku = cd.Sku,
            Price = cd.Price,
            Quantity = cd.Quantity
        };

		_unitOfWork.Carts.Add(cart);
		return await _unitOfWork.SaveChangesAsync();
	}

    public async Task<bool> Update(CartDetailDTO cd)
	{
		CartDetail cart = new CartDetail
        {
            UserId = await _unitOfWork.Users.GetUserIdByUsername(cd.Username),
            Sku = cd.Sku,
            Price = cd.Price,
            Quantity = cd.Quantity
        };

		_unitOfWork.Carts.Update(cart);
		return await _unitOfWork.SaveChangesAsync();
	}

    public async Task<bool> Delete(string username, string sku)
	{
		_unitOfWork.Carts.Delete(await _unitOfWork.Users.GetUserIdByUsername(username), sku);
		return await _unitOfWork.SaveChangesAsync();
	}

    public async Task<bool> DeleteAll(string username)
	{
		_unitOfWork.Carts.DeleteAll(await _unitOfWork.Users.GetUserIdByUsername(username));
		return await _unitOfWork.SaveChangesAsync();
	}
}
