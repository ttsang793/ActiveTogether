using AutoMapper;
using cartservices.Models;
using cartservices.DTO;

namespace cartservices.Profiles
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<ProductreadDTO, Product>();
        }
    }
}
