using Mapster;

using Shine.Data.Dto.OrderBuies;
using Shine.Data.Models;

namespace Shine.Data.Dto._Mapster
{
    public static class OrderBuySetting
    {
        public static void Setting()
        {
            TypeAdapterConfig<OrderBuy, OrderBuyDto>.NewConfig().Map(
                dest => dest.SupplierName,
                src => GetFullName(src.Person.FirstName, src.Person.LastName)
            );
        }

        private static string GetFullName(string firstName, string lastName)
        {
            var fullName = firstName + ' ' + lastName;
            return fullName;
        }
    }
}
