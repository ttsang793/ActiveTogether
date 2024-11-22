using Core.DTO;

namespace Application.Interface;

public interface ICartService
{
    Task<IEnumerable<CartDetailReadDTO>> GetCartByUsername(string username);

    Task<bool> Add(CartDetailDTO cd);

    Task<bool> Update(CartDetailDTO cd);

    Task<bool> Delete(string username, string sku);

    Task<bool> DeleteAll(string username);
}