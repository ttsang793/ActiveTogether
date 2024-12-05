using Core.Interface;
using Core.Entity;
using Core.DTO;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Net.WebSockets;
using System.Collections.Generic;

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

    public OrderDetail GetOrderDetailById(int id)
    {
        return GetDbContext().OrderDetails.First(o => o.Id == id);
    }

    public async Task<IEnumerable<OrderDetail>> GetOrderDetailsById(int id)
    {
        return await GetDbContext().OrderDetails.Where(o => o.OrderId == id).ToListAsync();
    }

    public IEnumerable<OrderDetailReadDTO> GetOrderDetailsByUsername(string username)
	{
        var userId = GetDbContext().Users.First(u => u.Username == username).Id;
        return (from od in GetDbContext().OrderDetails
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
                    IsReturn = od.IsReturn
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
            PaymentMethod = "Hoàn tiền",
            IsPaid = true,
            Status = 1,
            VertifyAdmin = r.VertifyAdmin
        });

        return GetDbSet().OrderByDescending(o => o.Id).First().Id + 1;
    }

    public int AddOrder(Order o)
	{
        GetDbSet().Add(o);
        return GetDbSet().Any() ? GetDbSet().OrderByDescending(o => o.Id).First().Id + 1 : 1;
	}

    public void AddOrderDetail(OrderDetail od) {
        GetDbContext().OrderDetails.Add(od);
    }

    public async Task<bool> CancelOrder(int id)
	{		
        var order = GetDbSet().First(o => o.Id == id);
        order.Status = -1;
        order.Total = 0;
        order.DateCanceled = DateTime.Now;

        var orderDetail = await GetOrderDetailsById(order.Id);

        foreach (var od in orderDetail) od.Quantity = 0;

        return true;
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

    public void ChangeRefundStatus(int id, bool status)
    {
        GetOrderDetailById(id).IsReturn = status;
    }

    public IEnumerable<OrderStatisticDTO> GetRevenueByDay(DateTime dateStart, DateTime dateEnd)
    {
        List<DateTime> statisticDays = new List<DateTime>();
        DateTime temp = dateStart;
        while (DateTime.Compare(temp, dateEnd) <= 0)
        {
            statisticDays.Add(temp);
            temp = temp.AddDays(1);
        }

        var revenue = (from d in statisticDays
                       join o in GetDbSet() on new { d.Day, d.Month, d.Year } equals new { o.DateReceived.Value.Day, o.DateReceived.Value.Month, o.DateReceived.Value.Year } into ordersInDay
                       from o in ordersInDay.DefaultIfEmpty()
                       group o by d.ToString("yyyy-MM-dd") into g
                       select new OrderStatisticDTO { Month = g.Key, Revenue = g.Sum(o => o?.Total ?? 0) }).ToList();

        var imports = (from d in statisticDays
                       join i in GetDbContext().Imports on new { d.Day, d.Month, d.Year } equals new { i.DateImport.Value.Day, i.DateImport.Value.Month, i.DateImport.Value.Year } into importsInDay
                       from i in importsInDay.DefaultIfEmpty()
                       group i by d.ToString("yyyy-MM-dd") into g
                       select new OrderStatisticDTO { Month = g.Key, ImportCost = g.Sum(i => i?.Total ?? 0) }).ToList();
        
        for (int i = 0; i < revenue.Count(); i++)
            revenue[i].ImportCost = imports[i].ImportCost ?? 0;

        return revenue;
    }

    public IEnumerable<OrderStatisticDTO> GetRevenueByWeek(DateTime dateStart, DateTime dateEnd)
    {
        var dayRevenue = GetRevenueByDay(dateStart, dateEnd).ToList();
        List<OrderStatisticDTO> weekRevenue = new List<OrderStatisticDTO>();

        for (int i = 0; i < dayRevenue.Count(); i++)
        {
            if (i % 7 == 0) weekRevenue.Add(new OrderStatisticDTO { Revenue = 0, ImportCost = 0 });
            weekRevenue[i / 7].Revenue += dayRevenue[i].Revenue;
            weekRevenue[i / 7].ImportCost += dayRevenue[i].ImportCost;
            if (i % 6 == 0 || i == dayRevenue.Count() - 1) weekRevenue[i / 7].Month = dayRevenue[i].Month;
        }
        
        return weekRevenue;
    }

    public IEnumerable<OrderStatisticDTO> GetRevenueByMonth(DateTime dateStart, DateTime dateEnd)
    {
        List<DateTime> statisticMonths = new List<DateTime>();
        DateTime temp = dateEnd;
        while (DateTime.Compare(temp, dateStart) >= 0)
        {
            statisticMonths.Insert(0, temp);
            temp = temp.AddMonths(-1);
        }

        var revenue = (from m in statisticMonths
                      join o in GetDbSet() on new { m.Month, m.Year } equals new { ((DateTime)o.DateReceived!).Month, ((DateTime)o.DateReceived).Year } into ordersInMonth
                      from o in ordersInMonth.DefaultIfEmpty()
                      where (DateTime.Compare((DateTime)o.DateReceived, dateStart) >= 0 && DateTime.Compare((DateTime)o.DateReceived, dateEnd) <= 0)
                      group o by m.ToString("yyyy-MM") into g
                      select new OrderStatisticDTO { Month = g.Key, Revenue = g.Sum(o => o.Total) }).ToList();

        var imports = (from m in statisticMonths
                      join i in GetDbContext().Imports on new { m.Month, m.Year } equals new { ((DateTime)i.DateImport!).Month, ((DateTime)i.DateImport).Year } into importsInMonth
                      from i in importsInMonth.DefaultIfEmpty()
                      where (DateTime.Compare((DateTime)i.DateImport, dateStart) >= 0 && DateTime.Compare((DateTime)i.DateImport, dateEnd) <= 0)
                      group i by m.ToString("yyyy-MM") into g
                      select new OrderStatisticDTO { Month = g.Key, ImportCost = g.Sum(i => i.Total) }).ToList();

        for (int i = 0; i < revenue.Count(); i++)
            revenue[i].ImportCost = imports[i].ImportCost;

        return revenue;
    }
}
