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
                    dest => dest.Photos, src => src.Photos.Select(p => new { p.PhotoUrl, p.Description, p.IsMain })
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
                    dest => dest.Photos, src => src.Photos.Select(p => new { p.PhotoUrl, p.Description, p.IsMain })
                );

        }
    }
}
