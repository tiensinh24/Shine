using System;

namespace Shine.Data.Dto.OrderBuies
{
    public class OrderBuyDto
    {
        public int OrderId { get; set; }
        public string OrderNumber { get; set; }
        public DateTime DateOfIssue { get; set; }
        public DateTime TimeForPayment { get; set; }
        public int PersonId { get; set; }
        
        public string SupplierName { get; set; }
    }
}