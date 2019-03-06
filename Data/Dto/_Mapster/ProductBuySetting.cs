using Mapster;
using Shine.Data.Dto.Products;
using Shine.Data.Models;

namespace Shine.Data.Dto._Mapster
{
    public static class ProductBuySetting
    {
        public static void Setting()
        {
            TypeAdapterConfig<ProductBuy, ProductBuyDto>.NewConfig().Map(
                dest => dest.CategoryName,
                src => src.Category.CategoryName
            );
        }
    }
}