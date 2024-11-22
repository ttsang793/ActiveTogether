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
}