using System;

namespace Shine.Data.Dto.Orders.Buy.Reports
{
    public class OrderBuyDebtDto
    {
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string MainPhotoUrl { get; set; }
        public int OrderId { get; set; }      
        public string OrderNumber { get; set; }
        public DateTime DateOfIssue { get; set; }
        public DateTime TimeForPayment { get; set; }  
        public decimal Debt { get; set; }
    }
}