using Application.Interface;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Core.Entity;
using Core.DTO;
using RestSharp;

namespace Application.Service;

public class MomoService : IMomoService
{
    private readonly IConfiguration _configuration;

    public MomoService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<MomoPaymentResponseModel> CreatePaymentAsync(OrderDTO order)
    {
        var momoOrderId = DateTime.UtcNow.Ticks.ToString();
        var orderInfo = $"{order.Username} {order.FullName} thanh toan {order.Total}";
        var rawData =
            $"partnerCode={_configuration["Momo:PartnerCode"]}&accessKey={_configuration["Momo:AccessKey"]}&requestId={momoOrderId}&amount={order.Total}&orderId={momoOrderId}&orderInfo={orderInfo}&returnUrl={_configuration["Momo:ReturnUrl"]}&notifyUrl={_configuration["Momo:NotifyUrl"]}&extraData=";

        var signature = ComputeHmacSha256(rawData, _configuration["Momo:SecretKey"]);

        var client = new RestClient(_configuration["Momo:MomoApiUrl"]);
        var request = new RestRequest() { Method = Method.Post };
        request.AddHeader("Content-Type", "application/json; charset=UTF-8");

        // Create an object representing the request data
        var requestData = new
        {
            accessKey = _configuration["Momo:AccessKey"],
            partnerCode = _configuration["Momo:PartnerCode"],
            requestType = _configuration["Momo:RequestType"],
            notifyUrl = _configuration["Momo:NotifyUrl"],
            returnUrl = _configuration["Momo:ReturnUrl"],
            orderId = momoOrderId,
            amount = order.Total.ToString(),
            orderInfo = orderInfo,
            requestId = momoOrderId,
            extraData = "",
            signature = signature
        };

        request.AddParameter("application/json", JsonConvert.SerializeObject(requestData), ParameterType.RequestBody);

        var response = await client.ExecuteAsync(request);
        return JsonConvert.DeserializeObject<MomoPaymentResponseModel>(response.Content);
    }

    public MomoPaymentResponseModel PaymentExecuteAsync(IQueryCollection collection)
    {
        return new MomoPaymentResponseModel()
        {
            ErrorCode = int.Parse(collection.First(s => s.Key == "errorCode").Value),
            Message = collection.First(s => s.Key == "message").Value,
            LocalMessage = collection.First(s => s.Key == "localMessage").Value,
            Signature = collection.First(s => s.Key == "signature").Value
        };
    }

    private string ComputeHmacSha256(string message, string secretKey)
    {
        var keyBytes = Encoding.UTF8.GetBytes(secretKey);
        var messageBytes = Encoding.UTF8.GetBytes(message);

        byte[] hashBytes;

        using (var hmac = new HMACSHA256(keyBytes))
        {
            hashBytes = hmac.ComputeHash(messageBytes);
        }

        var hashString = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();

        return hashString;
    }
}