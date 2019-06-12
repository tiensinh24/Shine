using System;
using System.Collections.Generic;

namespace Shine.Data.Dto.Suppliers.Reports
{
    public class OrderDebtBySupplierDto
    {
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public IEnumerable<_OrderDebtBySupplierDto> Orders { get; set; }

    }

    public class _OrderDebtBySupplierDto
    {
        public int OrderId { get; set; }
        public string OrderNumber { get; set; }
        public DateTime DateOfIssue { get; set; }
        public DateTime TimeForPayment { get; set; }
        public decimal Debt { get; set; }
    }
}