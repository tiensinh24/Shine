using System.Linq;

using Mapster;
using Shine.Data.Dto.Employees;
using Shine.Data.Dto.Orders.Buy;
using Shine.Data.Dto.Orders.Buy.Reports;
using Shine.Data.Dto.Suppliers;
using Shine.Data.Dto.Suppliers.Reports;
using Shine.Data.Models;

namespace Shine.Data.Dto._Mapster
{
    public static class OrderBuySetting
    {
        public static void Setting()
        {
            TypeAdapterConfig<OrderBuy, OrderBuyListDto>.NewConfig()
                .Map(
                    dest => dest.SupplierName,
                    src => GetFullName(src.Person.FirstName, src.Person.LastName)
                ).Map(
                    dest => dest.EmployeeName,
                    src => src.Employee.FirstName + " " + src.Employee.LastName
                ).Map(
                    dest => dest.Value,
                    src => src.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax))
                ).Map(
                    dest => dest.Cost,
                    src => src.Costs.Sum(c => c.Amount)
                );

            TypeAdapterConfig<OrderBuy, OrderBuyDetailDto>.NewConfig()
                .Map(
                    dest => dest.Supplier,
                    src => new SupplierListDto
                    {
                        PersonId = src.PersonId,
                        PersonNumber = src.Person.PersonNumber,
                        Gender = src.Person.Gender,
                        FirstName = src.Person.FirstName,
                        LastName = src.Person.LastName,
                        FullName = src.Person.FirstName + " " + src.Person.LastName,
                        DateOfBirth = src.Person.DateOfBirth,
                        Telephone = src.Person.Telephone,
                        Fax = src.Person.Fax,
                        CountryId = src.Person.Country.CountryId,
                        CountryName = src.Person.Country.CountryName,
                        ContinentName = src.Person.Country.ContinentName,
                        PhotoUrl = src.Person.Photos.FirstOrDefault(p => p.IsMain == true).PhotoUrl
                    }
                )
                .Map(
                    dest => dest.Employee,
                    src => new EmployeeListDto
                    {
                        EmployeeId = src.EmployeeId,
                        Gender = src.Employee.Gender,
                        FirstName = src.Employee.FirstName,
                        LastName = src.Employee.LastName,
                        FullName = src.Employee.FirstName + " " + src.Employee.LastName,
                        DateOfBirth = src.Employee.DateOfBirth,
                        Telephone = src.Employee.Telephone,
                        CountryId = src.Employee.CountryId,
                        CountryName = src.Employee.Country.CountryName,
                        DepartmentId = src.Employee.DepartmentId,
                        DepartmentName = src.Employee.Department.DepartmentName,
                        PhotoUrl = src.Employee.Photos.FirstOrDefault(p => p.IsMain == true).PhotoUrl
                    }
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
                    src => src.ProductOrders.Select(p => new OrderBuyProducts
                    {
                        OrderId = p.OrderId,
                        ProductId = p.Product.ProductId,
                        ProductName = p.Product.ProductName,
                        ProductPhotoUrl = p.Product.Photos.FirstOrDefault(pt => pt.IsMain == true).PhotoUrl,
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
                    src => src.Payments.Select(p => new
                    {
                        p.PaymentId,
                        p.OrderId,
                        p.PaymentDate,
                        p.Amount,
                        p.Currency,
                        p.Rate
                    }).OrderByDescending(p => p.PaymentDate)
                )
                .Map(
                    dest => dest.PaymentTotal,
                    src => src.Payments.Sum(p => p.Amount)
                )
                .Map(
                    dest => dest.Costs,
                    src => src.Costs.Select(c => new
                    {
                        c.Description,
                        c.Amount,
                        c.Currency
                    })
                )
                .Map(
                    dest => dest.CostTotal,
                    src => src.Costs.Sum(c => c.Amount)
                )
                .Map(
                    dest => dest.Debt,
                    src => src.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax))
                      - (src.Payments.Any() ? src.Payments.Sum(p => p.Amount) : 0)
                );

            TypeAdapterConfig<OrderBuy, OrderBuyDebtDto>.NewConfig()
                .Map(
                    dest => dest.SupplierId, src => src.PersonId
                )
                .Map(
                    dest => dest.SupplierName,
                    src => src.Person.FirstName + " " + src.Person.LastName
                )
                .Map(
                    dest => dest.MainPhotoUrl,
                    src => src.Person.Photos.FirstOrDefault(p => p.IsMain == true).PhotoUrl
                )
                .Map(
                    dest => dest.Debt,
                    src => src.ProductOrders.Sum(po => (po.Quantity * po.Price * (1 + po.Tax)))
                        - (src.Payments.Count() == 0 ? 0 : src.Payments.Sum(p => p.Amount))
                );

            TypeAdapterConfig<OrderBuy, OrderBuyLatestDto>.NewConfig()
                .Map(
                    dest => dest.SupplierName,
                    src => src.Person.FirstName + " " + src.Person.LastName
                )
                .Map(
                    dest => dest.Rating,
                          src => src.Person.Orders.Count() > 0
                          ? (src.Person.Orders.Sum(o => o.Rating) / src.Person.Orders.Count()) : 0
                )
                .Map(
                    dest => dest.MainPhotoUrl,
                    src => src.Person.Photos.FirstOrDefault(p => p.IsMain == true).PhotoUrl
                )
                .Map(
                    dest => dest.Value,
                    src => src.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax))
                );

            TypeAdapterConfig<OrderBuy, OrderValueDto>.NewConfig()
                .Map(
                    dest => dest.Value,
                    src => src.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax))
                );


        }

        private static string GetFullName(string firstName, string lastName)
        {
            var fullName = firstName + ' ' + lastName;
            return fullName;
        }
    }
}
