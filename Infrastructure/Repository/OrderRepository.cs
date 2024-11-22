using Core.Interface;
using Core.Entity;
using Core.DTO;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository;
public class OrderRepository : BaseRepository<Order>, IOrderRepository
{
    public OrderRepository(AtWebContext dbContext) : base(dbContext)
    {
    }
    
    public IEnumerable<Order> GetOrdersByUsername(string username)
	{
        var userId = GetDbContext().Users.First(u => u.Username == username).Id;
        return GetDbSet().Where(o => o.UserId == userId).OrderByDescending(o => o.Id);
	}

    public IEnumerable<OrderDetailReadDTO> GetOrderDetailsByUsername(string username)
	{
        var userId = GetDbContext().Users.First(u => u.Username == username).Id;
        return (from od in GetDbContext().OrderDetails
                join r in GetDbContext().Refunds on od.Id equals r.OrderDetailId into refundDetails
                from r in refundDetails.DefaultIfEmpty()
                join o in GetDbContext().Orders on od.OrderId equals o.Id
                join pd in GetDbContext().ProductDetails on od.Sku equals pd.Sku
                join pi in GetDbContext().ProductImages on pd.ProductColorId equals pi.ProductColorId
                join pc in GetDbContext().ProductColors on pi.ProductColorId equals pc.Id
                join c in GetDbContext().Colors on pc.ColorCode equals c.Code
                join p in GetDbContext().Products on pc.ProductId equals p.Id
                where o.UserId == userId
                group new { od, r, pd, pi, pc, c, p } by od.Sku into g
                select new OrderDetailReadDTO
                {
                    Id = g.Select(x => x.od.Id).First(),
                    OrderId = (int)(g.Select(x => x.od.OrderId).First()),
                    Sku = g.Select(x => x.od.Sku).First(),
                    Name = g.Select(x => x.p.Name).First(),
                    Price = g.Select(x => x.od.Price).First(),
                    Quantity = g.Select(x => x.od.Quantity).First(),
                    Color = g.Select(x => x.c.Name).First(),
                    Size = g.Select(x => x.pd.Size).First(),
                    Image = g.Select(x => x.pi.Image).First()!,
                    RefundStatus = g.Select(x => x.r.Status).First()
                }).ToList();
	}

    public int AddOrder(Order o)
	{
        GetDbSet().Add(o);
        return GetDbSet().Any() ? GetDbSet().OrderByDescending(o => o.Id).First().Id + 1 : 1;
	}

    public void AddOrderDetail(OrderDetail od) {
        GetDbContext().OrderDetails.Add(od);
    }

    public void CancelOrder(int id)
	{		
        var order = GetDbSet().First(o => o.Id == id);
        order.Status = -1;
	}
    
    public void ReceiveOrder(int id)
	{
        var order = GetDbSet().First(o => o.Id == id);
        order.Status = 3;
        order.DateReceived = DateTime.Now;
	}
}
