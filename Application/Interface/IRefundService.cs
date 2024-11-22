using Core.DTO;

namespace Application.Interface;

public interface IRefundService
{
    Task<bool> RequestRefund(RefundRequestDTO refund);
}