using Core.DTO;
using Core.Entity;
using Microsoft.AspNetCore.Http;

namespace Application.Interface;

public interface IMomoService
{
    Task<MomoPaymentResponseModel> CreatePaymentAsync(OrderDTO order);
    MomoPaymentResponseModel PaymentExecuteAsync(IQueryCollection collection);
}