using System;

using Mapster;

using Shine.Data.Dto.Products;
using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Models;

namespace Shine.Data.Dto._Mapster {
    public static class SupplierProductSetting {
        public static void Setting() {
            TypeAdapterConfig<PersonProduct, ProductSelectDto>.NewConfig()
                .Map(
                    dest => dest.ProductName, src => src.Product.ProductName
                );
        }

        static string GetFullName(string firstName, string lastName) {
            var fullName = firstName + ' ' + lastName;
            return fullName;
        }

        static int GetAge(DateTime Dob) {
            var year = DateTime.Now.Year - Dob.Year;
            var month = DateTime.Now.Month - Dob.Month;
            // if (month < 0) { year--; month += 12; }
            // return string.Format("{0} years {1} months", year, month);
            if (month > 0) { year++; }
            return year;
        }
    }
}
