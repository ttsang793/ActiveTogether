using Application.Interface;
using Core.DTO;
using Core.Entity;
using Core.Interface;
using Microsoft.EntityFrameworkCore;
using Mysqlx.Crud;

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
        _unitOfWork.Orders.ChangeRefundStatus(refund.OrderDetailId, true);
		return await _unitOfWork.SaveChangesAsync();
    }

    public IEnumerable<RefundReadAdminDTO> GetRefunds()
    {
        return _unitOfWork.Refunds.GetRefunds();
    }
	
    public async Task<bool> UpdateStatus(RefundUpdateAdminDTO r, bool updateQuantity)
    {
        _unitOfWork.Refunds.UpdateStatus(r);

        if (r.Status == -1) _unitOfWork.Orders.ChangeRefundStatus(r.OrderDetailId, false);
        if (r.Status > 0 && updateQuantity) await _unitOfWork.ProductDetails.ChangeQuantity(r.Sku, (int)r.Quantity);
        if (r.Status == 2)
        {
            decimal newPrice = (decimal)((await _unitOfWork.ProductDetails.GetProductDetailBySku(r.Sku)).Price * r.Quantity);

            int id = _unitOfWork.Orders.AddRefundOrder(r, newPrice);

            _unitOfWork.Orders.AddOrderDetail(new OrderDetail
            {
                OrderId = id,
                Sku = r.Sku!,
                Price = (newPrice >= r.Price) ? 0 : newPrice - r.Price,
                Quantity = r.Quantity
            });
        }

        return await _unitOfWork.SaveChangesAsync();
    }
}