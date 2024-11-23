using Core.DTO;
using Core.Entity;

namespace Application.Interface;

public interface IOrderService
{
    IEnumerable<OrderAdminDTO> GetAllOrders();

    IEnumerable<BillDetailAdminDTO> GetAllOrderDetails();

    IEnumerable<Order> GetOrdersByUsername(string username);

    IEnumerable<OrderDetailReadDTO> GetOrderDetailsByUsername(string username);

    Task<bool> AddOrder(OrderDTO o);

    Task<bool> CancelOrder(int id);

    Task<bool> ReceiveOrder(int id);

    Task<bool> ChangeStatus(OrderVertifyDTO o);
}