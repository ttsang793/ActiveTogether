using Core.DTO;
using Core.Entity;

namespace Core.Interface;

public interface IOrderRepository
{
    IEnumerable<OrderAdminDTO> GetAllOrders();

    IEnumerable<BillDetailAdminDTO> GetAllOrderDetails();

    IEnumerable<Order> GetOrdersByUsername(string username);

    Order GetOrderById(int id);

    IEnumerable<OrderDetailReadDTO> GetOrderDetailsByUsername(string username);

    OrderDetail GetOrderDetailById(int id);

    Task<IEnumerable<OrderDetail>> GetOrderDetailsById(int id);

    int AddRefundOrder(RefundUpdateAdminDTO r, decimal newPrice);

    int AddOrder(Order o);

    void AddOrderDetail(OrderDetail od);

    Task<bool> CancelOrder(int id);
    
    void ReceiveOrder(int id);

    void ChangeStatus(OrderVertifyDTO o);

    void ChangeRefundStatus(int id, bool status);
}