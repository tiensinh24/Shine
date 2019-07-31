using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models
{
    public abstract class Order : IAuditedEntityBase, ISoftDelete {
#region Properties
        public int OrderId { get; set; }

        [Required]
        [MaxLength(50)]
        public string OrderNumber { get; set; }

        [Required]
        public DateTime DateOfIssue { get; set; }
        public DateTime TimeForPayment { get; set; }
        public decimal Rating { get; set; }
        public bool OrderType { get; set; }
#endregion

#region FK
        public int PersonId { get; set; }
        public int EmployeeId { get; set; }

#endregion

#region Navigation Properties
        public Person Person { get; set; }
        public Employee Employee { get; set; }
        public IEnumerable<ProductOrder> ProductOrders { get; set; }
        public IEnumerable<Payment> Payments { get; set; }
        public IEnumerable<Cost> Costs { get; set; }
#endregion
    }

    public class OrderBuy : Order, INotRoot { }

    public class OrderSell : Order, INotRoot { }
}
