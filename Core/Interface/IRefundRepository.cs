using Core.DTO;

namespace Core.Interface;

public interface IRefundRepository
{
    void RequestRefund(RefundRequestDTO refund);
    
    IEnumerable<RefundReadAdminDTO> GetRefunds();

    void UpdateStatus(RefundUpdateAdminDTO r);
}