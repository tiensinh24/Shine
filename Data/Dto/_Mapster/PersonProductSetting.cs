using System.Linq;

using Mapster;
using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Dto.Suppliers;
using Shine.Data.Models;

namespace Shine.Data.Dto._Mapster
{
    public static class PersonProductSetting
    {
        public static void Setting()
        {
            TypeAdapterConfig<PersonProduct, ProductsBySupplierDto>.NewConfig()
                .Map(dest => dest.ProductName, src => src.Product.ProductName)
                .Map(dest => dest.Specification, src => src.Product.Specification)
                .Map(dest => dest.CategoryId, src => src.Product.CategoryId)
                .Map(dest => dest.CategoryName, src => src.Product.Category.CategoryName)
                .Map(dest => dest.PhotoUrl, src => src.Product.Photos.FirstOrDefault(p => p.IsMain).PhotoUrl);

        }
    }
}
