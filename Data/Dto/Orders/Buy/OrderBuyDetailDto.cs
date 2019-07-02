using System;
using System.Collections.Generic;
using Shine.Data.Dto.Costs;
using Shine.Data.Dto.Payments;
using Shine.Data.Dto.Products.Buy;

namespace Shine.Data.Dto.Orders.Buy {

    public class OrderBuyDetailDto {
        public int OrderId { get; set; }
        public string OrderNumber { get; set; }
        public DateTime DateOfIssue { get; set; }
        public DateTime TimeForPayment { get; set; }
        public int PersonId { get; set; }
        public int EmployeeId { get; set; }
        public decimal Rating { get; set; }

        public string SupplierName { get; set; }
        public string EmployeeName { get; set; }
        public decimal OrderTotal { get; set; }
        public decimal PaymentTotal { get; set; }
        public IEnumerable<OrderBuyProducts> Products { get; set; }
        public IEnumerable<PaymentDto> Payments { get; set; }
        public decimal TotalPayment { get; set; }
        public IEnumerable<CostDto> Costs { get; set; }
        public decimal TotalCost { get; set; }
        public decimal Debt { get; set; }

    }

    public class OrderBuyProducts {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Specification { get; set; }
        public decimal Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Tax { get; set; }
        public decimal Rate { get; set; }
        public string Unit { get; set; }
        public decimal Total { get; set; }

    }

}
