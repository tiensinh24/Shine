using System;

using Mapster;

using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Models;

namespace Shine.Data.Dto._Mapster
{
    public static class SupplierProductSetting
    {
        public static void Setting()
        {
            TypeAdapterConfig<PersonProduct, SupplierProductDto>.NewConfig()
                .Map(
                    dest => dest.FullName, src => GetFullName(src.Person.FirstName, src.Person.LastName)
                ).Map(
                    dest => dest.Age, src => GetAge(src.Person.DateOfBirth)
                ).Map(
                    dest => dest.ProductName, src => src.Product.Name
                ).Map(
                    dest => dest.Specification, src => src.Product.Specification
                );

            TypeAdapterConfig<PersonProduct, ProductsBySupplierDto>.NewConfig().Map(
                dest => dest.CategoryName,
                src => src.Product.Category.CategoryName
            ).Map(
                dest => dest.SupplierId, src => src.PersonId
            ).Map(
                dest => dest.Name, src => src.Product.Name
            ).Map(
                dest => dest.Specification, src => src.Product.Specification
            ).Map(
                dest => dest.Price, src => src.Product.Price
            ).Map(
                dest => dest.CategoryId, src => src.Product.CategoryId
            );
        }

        static string GetFullName(string firstName, string lastName)
        {
            var fullName = firstName + ' ' + lastName;
            return fullName;
        }

        static int GetAge(DateTime Dob)
        {
            var year = DateTime.Now.Year - Dob.Year;
            var month = DateTime.Now.Month - Dob.Month;
            // if (month < 0) { year--; month += 12; }
            // return string.Format("{0} years {1} months", year, month);
            if (month > 0) { year++; }
            return year;
        }
    }
}
