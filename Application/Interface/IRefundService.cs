using Core.DTO;

namespace Application.Interface;

public interface IRefundService
{
    Task<bool> StillInWaranty(int orderId, int orderDetailId);

    Task<bool> RequestRefund(RefundRequestDTO refund);

    IEnumerable<RefundReadAdminDTO> GetRefunds();

    Task<bool> UpdateStatus(RefundUpdateAdminDTO r, bool updateQuantity);
}