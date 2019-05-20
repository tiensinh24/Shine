using System;

namespace Shine.Data.Dto.Suppliers {
    public class SupplierOrdersDto {
        public int OrderId { get; set; }
        public int PersonId { get; set; }
        public string OrderNumber { get; set; }
        public DateTime DateOfIssue { get; set; }
        public DateTime TimeForPayment { get; set; }
        public decimal Rating { get; set; }
    }
}