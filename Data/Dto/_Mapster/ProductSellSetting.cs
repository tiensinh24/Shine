using System.Linq;
using Mapster;
using Shine.Data.Dto.Products;
using Shine.Data.Dto.Products.Sell;
using Shine.Data.Models;

namespace Shine.Data.Dto._Mapster {
    public class ProductSellSetting {
        public static void Setting () {
            TypeAdapterConfig<ProductSell, ProductSellListDto>.NewConfig ()
                .Map (
                    dest => dest.CategoryName, src => src.Category.CategoryName
                )
                .Map (
                    dest => dest.PhotoUrl, src => src.Photos.FirstOrDefault (p => p.IsMain).PhotoUrl
                );

            TypeAdapterConfig<ProductSell, ProductSellDetailDto>.NewConfig ()
                .Map (
                    dest => dest.CategoryName, source => source.Category.CategoryName
                )
                .Map (
                    dest => dest.Photos,
                    src => src.Photos.Select (p => new { p.ProductId, p.PhotoId, p.PhotoUrl, p.IsMain })
                    .OrderByDescending (p => p.IsMain)
                );

            TypeAdapterConfig<ProductSell, ProductRemainDto>.NewConfig ()
                .Map (
                    dest => dest.Remain,
                    src => src.StorageProducts.Sum (sp => sp.Quantity)
                );

        }
    }
}