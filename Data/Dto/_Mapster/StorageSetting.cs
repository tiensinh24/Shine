using System.Linq;

using Mapster;

using Shine.Data.Dto.Products;
using Shine.Data.Models;

namespace Shine.Data.Dto._Mapster {
    public static class StorageSetting {
        public static void Setting() {
            TypeAdapterConfig<Storage, ProductStorageRemainDto>.NewConfig()
                .Map(
                    dest => dest.StorageName, src => src.Name
                ).Map(
                    dest => dest.Remain,
                    src => src.StorageProducts.Where(sp => sp.StorageId == src.StorageId).Sum(sp => sp.Quantity)
                    - src.StorageProducts.Where(sp => sp.StorageId == src.StorageId).Sum(sp => sp.Quantity)
                )
        }
    }
}
