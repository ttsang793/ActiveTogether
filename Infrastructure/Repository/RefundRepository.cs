using Core.Interface;
using Core.Entity;
using Core.DTO;
using Infrastructure.Data;

namespace Infrastructure.Repository;
public class RefundRepository : BaseRepository<Refund>, IRefundRepository
{
    public RefundRepository(AtWebContext dbContext) : base(dbContext)
    {
    }

    public void RequestRefund(RefundRequestDTO refund)
    {
        GetDbSet().Add(new Refund
        {
            OrderDetailId = refund.OrderDetailId,
            Quantity = refund.Quantity,
            Price = refund.Price,
            Status = 0,
            Reason = refund.Reason
        });
    }

    public IEnumerable<RefundReadAdminDTO> GetRefunds()
    {
        return (from r in GetDbContext().Refunds
                join od in GetDbContext().OrderDetails on r.OrderDetailId equals od.Id
                join o in GetDbContext().Orders on od.OrderId equals o.Id
                join pd in GetDbContext().ProductDetails on od.Sku equals pd.Sku
                join pc in GetDbContext().ProductColors on pd.ProductColorId equals pc.Id
                join c in GetDbContext().Colors on pc.ColorCode equals c.Code
                join p in GetDbContext().Products on pc.ProductId equals p.Id
                orderby r.Id descending
                select new RefundReadAdminDTO
                {
                    OrderId = o.Id,
                    OrderDetailId = od.Id,
                    Sku = od.Sku,
                    Name = p.Name,
                    Color = c.Name,
                    Size = pd.Size,
                    Price = od.Price,
                    Quantity = r.Quantity,
                    Reason = r.Reason,
                    Status = r.Status
                }).ToList();
    }

    public void UpdateStatus(RefundUpdateAdminDTO r)
    {
        var refund = GetDbSet().First(od => od.OrderDetailId == r.OrderDetailId);
        refund.Status = r.Status;
        refund.DateRefund = DateTime.Now;
        refund.CheckAdmin = r.VertifyAdmin;

        if (r.Status == -1) refund.Price = 0;
    }
}