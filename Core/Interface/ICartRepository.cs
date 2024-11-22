using Core.DTO;
using Core.Entity;
namespace Core.Interface;

public interface ICartRepository
{
    Task<IEnumerable<CartDetailReadDTO>> GetCartByUsername(string username);

    void Add(CartDetail cd);

    void Update(CartDetail cd);

    void Delete(int userId, string sku);

    void DeleteAll(int userId);
}