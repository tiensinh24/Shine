using Mapster;

using Shine.Data.Dto.Orders.Buy;
using Shine.Data.Models;

namespace Shine.Data.Dto._Mapster
{
    public static class ProductOrderSetting
    {
        public static void Setting()
        {
            TypeAdapterConfig<ProductOrder, ProductOrderDto>.NewConfig()
                .Map(
                    dest => dest.ProductName, src => src.Product.ProductName
                );
        }
    }
}
