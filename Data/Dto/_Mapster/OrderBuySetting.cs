using System.Linq;

using Mapster;

using Shine.Data.Dto.Orders.Buy;
using Shine.Data.Models;

namespace Shine.Data.Dto._Mapster {
    public static class OrderBuySetting {
        public static void Setting() {
            TypeAdapterConfig<OrderBuy, OrderBuyListDto>.NewConfig()
                .Map(
                    dest => dest.SupplierName,
                    src => GetFullName(src.Person.FirstName, src.Person.LastName)
                );

            TypeAdapterConfig<OrderBuy, OrderBuyDetailDto>.NewConfig()
                .Map(
                    dest => dest.SupplierName,
                    src => GetFullName(src.Person.FirstName, src.Person.LastName)
                )
                .Map(
                    dest => dest.Products,
                    src => src.ProductOrders.Select(p => new {
                        p.Product.ProductId,
                            p.Product.ProductName,
                            p.Product.Specification,
                            p.Quantity,
                            p.Price,
                            p.Tax,
                            p.Rate,
                            p.Unit
                    })
                )
                .Map(
                    dest => dest.Payments,
                    src => src.Payments.Select(p => new { p.OrderId, p.PaymentDate, p.Amount, p.Currency, p.Rate })
                );

        }

        private static string GetFullName(string firstName, string lastName) {
            var fullName = firstName + ' ' + lastName;
            return fullName;
        }
    }
}