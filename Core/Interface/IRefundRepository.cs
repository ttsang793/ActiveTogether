using Core.DTO;

namespace Core.Interface;

public interface IRefundRepository
{
    void RequestRefund(RefundRequestDTO refund);
}