using Application.Interface;
using Core.DTO;
using Core.Interface;

namespace Application.Service;

public class RefundService : IRefundService
{
    private readonly IUnitOfWork _unitOfWork;

    public RefundService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<bool> RequestRefund(RefundRequestDTO refund)
    {
		_unitOfWork.Refunds.RequestRefund(refund);
		return await _unitOfWork.SaveChangesAsync();
    }
}