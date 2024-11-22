using Core.DTO;
using Core.Entity;

namespace Application.Interface;

public interface IOrderService
{
    IEnumerable<Order> GetOrdersByUsername(string username);

    IEnumerable<OrderDetailReadDTO> GetOrderDetailsByUsername(string username);

    Task<bool> AddOrder(OrderDTO o);

    Task<bool> CancelOrder(int id);

    Task<bool> ReceiveOrder(int id);
}