using System.Linq;

using Mapster;

using Shine.Data.Dto.Products.Buy;
using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Models;

namespace Shine.Data.Dto._Mapster {
    public static class ProductBuySetting {
        public static void Setting() {
            TypeAdapterConfig<ProductBuy, ProductBuyListDto>.NewConfig()
                .Map(
                    dest => dest.CategoryName, src => src.Category.CategoryName
                )
                .Map(
                    dest => dest.PhotoUrl, src => src.Photos.FirstOrDefault(p => p.IsMain).PhotoUrl
                );

        }
    }
}
