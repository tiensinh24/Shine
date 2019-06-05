using System;

namespace Shine.Data.Dto.Orders.Buy {
    public class OrderBuyListDto {
        public int OrderId { get; set; }
        public string OrderNumber { get; set; }
        public DateTime DateOfIssue { get; set; }
        public DateTime TimeForPayment { get; set; }
        public int PersonId { get; set; }
        public decimal Rating { get; set; }

        public string SupplierName { get; set; }
        public string EmployeeName { get; set; }

        public decimal Value { get; set; }
        public decimal Cost { get; set; }

    }
}
