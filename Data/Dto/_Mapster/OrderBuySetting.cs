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
                    dest => dest.OrderTotal,
                    src => src.ProductOrders.Sum(p => p.Price * p.Quantity * (1 + p.Tax))
                )
                .Map(
                    dest => dest.PaymentTotal,
                    src => src.Payments.Sum(p => p.Amount)
                )
                .Map(
                    dest => dest.Products,
                    src => src.ProductOrders.Select(p => new OrderBuyProducts {
                        OrderId = p.OrderId,
                            ProductId = p.Product.ProductId,
                            ProductName = p.Product.ProductName,
                            Specification = p.Product.Specification,
                            Quantity = p.Quantity,
                            Price = p.Price,
                            Tax = p.Tax,
                            Rate = p.Rate,
                            Unit = p.Unit,
                            Total = p.Price * p.Quantity * (1 + p.Tax) * p.Rate
                    })
                )
                .Map(
                    dest => dest.Payments,
                    src => src.Payments.Select(p => new {
                        p.PaymentId,
                            p.OrderId,
                            p.PaymentDate,
                            p.Amount,
                            p.Currency,
                            p.Rate
                    }).OrderByDescending(p => p.PaymentDate)
                );
        }

        private static string GetFullName(string firstName, string lastName) {
            var fullName = firstName + ' ' + lastName;
            return fullName;
        }
    }
}
