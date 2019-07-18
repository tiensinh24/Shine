using Mapster;

using Shine.Data.Dto.Orders.Buy;
using Shine.Data.Dto.Products;
using Shine.Data.Models;

namespace Shine.Data.Dto._Mapster
{
    public static class ProductOrderSetting
    {
        public static void Setting()
        {
            TypeAdapterConfig<ProductOrder, OrderBuyProducts>.NewConfig()
                .Map(dest => dest.ProductName, src => src.Product.ProductName)
                .Map(dest => dest.Specification, src => src.Product.Specification)
                .Map(dest => dest.Total, src => src.Quantity * src.Price * (1 + src.Tax));
        }
    }
}
