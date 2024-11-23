using Core.DTO;

namespace Application.Interface;

public interface IRefundService
{
    Task<bool> RequestRefund(RefundRequestDTO refund);

    IEnumerable<RefundReadAdminDTO> GetRefunds();

    Task<bool> UpdateStatus(RefundUpdateAdminDTO r, bool updateQuantity);
}