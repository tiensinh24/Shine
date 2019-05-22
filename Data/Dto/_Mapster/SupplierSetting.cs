using System.Linq;

using Mapster;

using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Dto.Suppliers;
using Shine.Data.Models;

namespace Shine.Data.Dto._Mapster {
    public static class SupplierSetting {
        public static void Setting() {
            TypeAdapterConfig<Supplier, SupplierListDto>.NewConfig()
                .Map(
                    dest => dest.FullName, src => src.FirstName + " " + src.LastName
                )
                .Map(
                    dest => dest.CountryName, src => src.Country.CountryName
                )
                .Map(
                    dest => dest.ContinentName, src => src.Country.ContinentName
                )
                .Map(
                    dest => dest.PhotoUrl,
                    src => src.Photos.FirstOrDefault(p => p.IsMain).PhotoUrl
                ).Map(
                    dest => dest.Rating,
                    src => src.Orders.Count() > 0
                    ? (src.Orders.Sum(o => o.Rating) / src.Orders.Count()) : 0
                );

            TypeAdapterConfig<Supplier, SupplierDetailDto>.NewConfig()
                .Map(
                    dest => dest.FullName, src => src.FirstName + " " + src.LastName
                )
                .Map(
                    dest => dest.CountryName, src => src.Country.CountryName
                )
                .Map(
                    dest => dest.ContinentName, src => src.Country.ContinentName
                )
                .Map(
                    dest => dest.Photos,
                    src => src.Photos.Select(p => new { p.PersonId, p.PhotoId, p.PhotoUrl, p.IsMain })
                    .OrderByDescending(p => p.IsMain)
                ).Map(
                    dest => dest.Rating,
                    src => src.Orders.Count() > 0 ? src.Orders.Average(o => o.Rating) : 0
                );

            TypeAdapterConfig<Supplier, SupplierSelectDto>.NewConfig()
                .Map(
                    dest => dest.FullName, src => src.FirstName + " " + src.LastName
                );

        }
    }
}
