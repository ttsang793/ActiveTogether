using Core.DTO;
using Core.Entity;
using Microsoft.AspNetCore.Http;

namespace Application.Interface;

public interface IVnPayService
{
    string CreatePaymentUrl(OrderDTO order, HttpContext context);

    PaymentResponseModel PaymentExecute(IQueryCollection collections);
}
