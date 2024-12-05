using Application.Interface;
using Core.DTO;
using Core.Entity;
using Core.Interface;

namespace Application.Service;

public class OrderService : IOrderService
{
    private readonly IUnitOfWork _unitOfWork;

    public OrderService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    
    public IEnumerable<OrderAdminDTO> GetAllOrders()
    {
        return _unitOfWork.Orders.GetAllOrders();
    }

    public IEnumerable<BillDetailAdminDTO> GetAllOrderDetails()
    {
        return _unitOfWork.Orders.GetAllOrderDetails();
    }

    public IEnumerable<Order> GetOrdersByUsername(string username)
    {
        return _unitOfWork.Orders.GetOrdersByUsername(username);
    }

    public IEnumerable<OrderDetailReadDTO> GetOrderDetailsByUsername(string username)
    {
        return _unitOfWork.Orders.GetOrderDetailsByUsername(username);
    }

    public async Task<bool> AddOrder(OrderDTO o)
    {
        var order = new Order
        {
            UserId = o.Username != "" ? await _unitOfWork.Users.GetUserIdByUsername(o.Username) : 0,
            Address = o.Address,
            Email = o.Email,
            FullName = o.FullName,
            Phone = o.Phone,
            Total = o.Total,
            DatePurchased = DateTime.Now,
            PaymentMethod = o.PaymentMethod,
            IsPaid = (o.PaymentMethod != "Tiền mặt"),
            Status = 0
        };        
        order.Point = (int)(order.UserId > 0 ? o.Total / 10000 : 0);
        int id = _unitOfWork.Orders.AddOrder(order);

        foreach (var odDTO in o.OrderDetails)
        {
            OrderDetail od = new OrderDetail
            {
                OrderId = id,
                Sku = odDTO.Sku,
                Price = odDTO.Price,
                Quantity = odDTO.Quantity
            };
            _unitOfWork.Orders.AddOrderDetail(od);
            _unitOfWork.Carts.Delete((int)(order.UserId), od.Sku);
        }
        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> CancelOrder(int id)
    {
        await _unitOfWork.Orders.CancelOrder(id);
        return await _unitOfWork.SaveChangesAsync();
    }
    
    public async Task<bool> ReceiveOrder(int id)
    {
        _unitOfWork.Orders.ReceiveOrder(id);

        var order = _unitOfWork.Orders.GetOrderById(id);
        if (order.UserId > 0)
            await _unitOfWork.Users.GainPoint(order.UserId, order.Point);

        var orderDetails = await _unitOfWork.Orders.GetOrderDetailsById(id);

        foreach (var od in orderDetails)
            await _unitOfWork.ProductDetails.ChangeQuantity(od.Sku, (int)(od.Quantity * -1));

        return await _unitOfWork.SaveChangesAsync();
    }

    public async Task<bool> ChangeStatus(OrderVertifyDTO o)
    {
        _unitOfWork.Orders.ChangeStatus(o);
        return await _unitOfWork.SaveChangesAsync();
    }

    public IEnumerable<OrderStatisticDTO> ListSaleRevenue(DateTime dateStart, DateTime dateEnd)
    {
        int monthDifference = (dateEnd.Year - dateStart.Year) * 12 + dateEnd.Month - dateStart.Month;
        if (monthDifference > 1) return _unitOfWork.Orders.GetRevenueByMonth(dateStart, dateEnd);

        TimeSpan dayDifference = dateEnd - dateStart;
        if (monthDifference == 0 && dayDifference.Days < 14) return _unitOfWork.Orders.GetRevenueByDay(dateStart, dateEnd);
        return _unitOfWork.Orders.GetRevenueByWeek(dateStart, dateEnd);
    }
}