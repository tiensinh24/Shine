using System;

namespace Shine.Data.Dto.Orders.Sell.Reports {
    public class OrderSellDebtDto {
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string MainPhotoUrl { get; set; }
        public int OrderId { get; set; }
        public string OrderNumber { get; set; }
        public DateTime DateOfIssue { get; set; }
        public DateTime TimeForPayment { get; set; }
        public decimal Debt { get; set; }
    }
}