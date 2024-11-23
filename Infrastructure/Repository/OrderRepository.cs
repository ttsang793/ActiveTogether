using Core.Interface;
using Core.Entity;
using Core.DTO;
using Infrastructure.Data;

namespace Infrastructure.Repository;
public class OrderRepository : BaseRepository<Order>, IOrderRepository
{
    public OrderRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public IEnumerable<OrderAdminDTO> GetAllOrders()
    {
        return (from o in GetDbSet() join a in GetDbContext().AdminUsers on o.VertifyAdmin equals a.Id into adminGroup
                from a in adminGroup.DefaultIfEmpty()
                select new OrderAdminDTO(o, a.FullName)).ToList();
    }

    public IEnumerable<BillDetailAdminDTO> GetAllOrderDetails()
    {
        var orderDetails = (from o in GetDbContext().OrderDetails
                            join pd in GetDbContext().ProductDetails on o.Sku equals pd.Sku
                            join pc in GetDbContext().ProductColors on pd.ProductColorId equals pc.Id
                            join c in GetDbContext().Colors on pc.ColorCode equals c.Code
                            join p in GetDbContext().Products on pc.ProductId equals p.Id
                            select new BillDetailAdminDTO
                            {
                                BillId = (int)o.OrderId,
                                Sku = o.Sku,
                                Name = p.Name,
                                Color = c.Name,
                                Size = pd.Size,
                                Price = o.Price,
                                Quantity = o.Quantity
                            }).ToList();
        return orderDetails;
    }

    public IEnumerable<Order> GetOrdersByUsername(string username)
	{
        var userId = GetDbContext().Users.First(u => u.Username == username).Id;
        return GetDbSet().Where(o => o.UserId == userId).OrderByDescending(o => o.Id);
	}

    public Order GetOrderById(int id)
    {
        return GetDbSet().First(o => o.Id == id);
    }

    public IEnumerable<OrderDetail> GetOrderDetailsById(int id)
    {
        return GetDbContext().OrderDetails.Where(o => o.OrderId == id);
    }

    public IEnumerable<OrderDetailReadDTO> GetOrderDetailsByUsername(string username)
	{
        var userId = GetDbContext().Users.First(u => u.Username == username).Id;
        return (from od in GetDbContext().OrderDetails
                join r in GetDbContext().Refunds on od.Id equals r.OrderDetailId into refundDetails
                from r in refundDetails.DefaultIfEmpty()
                join o in GetDbSet() on od.OrderId equals o.Id
                join pd in GetDbContext().ProductDetails on od.Sku equals pd.Sku
                join pi in GetDbContext().ProductImages on pd.ProductColorId equals pi.ProductColorId
                join pc in GetDbContext().ProductColors on pi.ProductColorId equals pc.Id
                join c in GetDbContext().Colors on pc.ColorCode equals c.Code
                join p in GetDbContext().Products on pc.ProductId equals p.Id
                where o.UserId == userId
                select new OrderDetailReadDTO
                {
                    Id = od.Id,
                    OrderId = (int)(od.OrderId),
                    Sku = od.Sku,
                    Name = p.Name,
                    Price = od.Price,
                    Quantity = od.Quantity,
                    Color = c.Name,
                    Size = pd.Size,
                    Image = pi.Image!,
                    RefundStatus = r.Status
                }).ToList();
	}

    public int AddRefundOrder(RefundUpdateAdminDTO r, decimal newPrice)
    {        
        decimal? newTotal = newPrice * r.Quantity;
        var oldOrder = GetOrderById(r.OrderId);

        GetDbSet().Add(new Order
        {
            UserId = oldOrder.UserId,
            Address = oldOrder.Address,
            Email = oldOrder.Email,
            FullName = oldOrder.FullName,
            Phone = oldOrder.Phone,
            Total = (newTotal >= r.Price * r.Quantity) ? 0 : newTotal - r.Price * r.Quantity,
            Point = (int)((oldOrder.UserId > 0) ? newTotal / 10000 : 0)!,
            DatePurchased = DateTime.Now,
            DateVertified = DateTime.Now,
            Status = 1,
            VertifyAdmin = r.VertifyAdmin
        });

        return GetDbSet().OrderByDescending(o => o.Id).First().Id + 1;
    }

    public int AddOrder(Order o)
	{
        GetDbSet().Add(o);
        return GetDbSet().OrderByDescending(o => o.Id).First().Id + 1;
	}

    public void AddOrderDetail(OrderDetail od) {
        GetDbContext().OrderDetails.Add(od);
    }

    public void CancelOrder(int id)
	{		
        var order = GetDbSet().First(o => o.Id == id);
        order.Status = -1;
        order.Total = 0;
        order.DateCanceled = DateTime.Now;

        foreach (var od in GetOrderDetailsById(order.Id)) od.Quantity = 0;
	}
    
    public void ReceiveOrder(int id)
	{
        var order = GetDbSet().First(o => o.Id == id);
        order.Status = 4;
        order.DateReceived = DateTime.Now;
    }

    public void ChangeStatus(OrderVertifyDTO or)
    {
        var order = GetDbSet().First(o => o.Id == or.Id);
        order.Status = or.Status;
        if (or.Status == 1)
        {
            order.VertifyAdmin = or.VertifyAdmin;
            order.DateVertified = DateTime.Now;
        }
        GetDbSet().Update(order);
    }
}
