using System;

namespace Shine.Data.Dto.Orders.Sell.Queries {
    public class OrderSellQuery {
        public int? CustomerId { get; set; }
        public int? EmployeeId { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }
}