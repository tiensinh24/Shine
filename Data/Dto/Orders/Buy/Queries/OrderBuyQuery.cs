using System;

namespace Shine.Data.Dto.Orders.Buy.Queries
{
    public class OrderBuyQuery
    {
        public int SupplierId { get; set; }
        public int EmployeeId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
    }
}