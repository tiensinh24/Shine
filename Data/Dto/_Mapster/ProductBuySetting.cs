using System.Collections.Generic;
using System.Linq;

using Mapster;

using Shine.Data.Dto.Photos;
using Shine.Data.Dto.Products;
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

            TypeAdapterConfig<ProductBuy, ProductBuyDetailDto>.NewConfig()
                .Map(
                    dest => dest.CategoryName, source => source.Category.CategoryName
                )
                .Map(
                    dest => dest.Photos,
                    src => src.Photos.Select(p => new { p.ProductId, p.PhotoId, p.PhotoUrl, p.IsMain })
                    .OrderByDescending(p => p.IsMain)
                );

            TypeAdapterConfig<ProductBuy, ProductRemainDto>.NewConfig()
                .Map(
                    dest => dest.Remain,
                    src => src.StorageProducts.Where(sp => sp.Type == true).Sum(sp => sp.Quantity)
                    - src.StorageProducts.Where(sp => sp.Type == false).Sum(sp => sp.Quantity)
                );

            TypeAdapterConfig<ProductBuy, ProductStorageRemainDto>.NewConfig()
                .Map(
                    dest => dest.StorageName,
                    src => src.StorageProducts.FirstOrDefault().Storage.Name
                ).Map(
                    dest => dest.Remain,
                    src => src.StorageProducts.GroupBy(sp => new { sp.ProductId, sp.StorageId })
                    .Select(sp => )

                );
        }
    }
}
