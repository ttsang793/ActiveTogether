using Core.DTO;
using Core.Entity;

namespace Core.Interface;

public interface IOrderRepository
{
    IEnumerable<Order> GetOrdersByUsername(string username);

    IEnumerable<OrderDetailReadDTO> GetOrderDetailsByUsername(string username);

    int AddOrder(Order o);

    void AddOrderDetail(OrderDetail od);

    void CancelOrder(int id);
    
    void ReceiveOrder(int id);
}