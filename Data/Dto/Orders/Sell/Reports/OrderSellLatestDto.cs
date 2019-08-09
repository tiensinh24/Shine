using System;

namespace Shine.Data.Dto.Orders.Sell.Reports {
    public class OrderSellLatestDto {
        public int OrderId { get; set; }
        public string OrderNumber { get; set; }
        public DateTime DateOfIssue { get; set; }
        public DateTime TimeForPayment { get; set; }
        public string CustomerName { get; set; }
        public Single Rating { get; set; }
        public string MainPhotoUrl { get; set; }
        public decimal Value { get; set; }
    }
}