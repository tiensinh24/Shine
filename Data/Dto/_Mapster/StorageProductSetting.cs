using Mapster;

using Shine.Data.Dto.Storages;
using Shine.Data.Models;

namespace Shine.Data.Dto._Mapster {
    public static class StorageProductSetting {
        public static void Setting() {
            TypeAdapterConfig<StorageProduct, StorageProductsListDto>.NewConfig()
                .Map(
                    dest => dest.ProductName, src => src.Product.ProductName
                );
        }
    }
}
