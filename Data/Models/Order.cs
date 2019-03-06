using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models
{
    public abstract class Order : IAuditedEntityBase, ISoftDelete
    {
#region Properties
        public int OrderId { get; set; }
        [Required]
        [MaxLength(50)]
        public string OrderNumber { get; set; }
        [Required]
        public DateTime DateOfIssue { get; set; }
        public DateTime TimeForPayment { get; set; }
        public bool OrderType { get; set; }
#endregion

#region FK
        public int PersonId { get; set; }
#endregion

#region Navigation Properties
        public Person Person { get; set; }
        public IEnumerable<ProductOrder> ProductOrders { get; set; }
        public IEnumerable<Payment> Payments { get; set; }
        public IEnumerable<Cost> Costs { get; set; }
#endregion
    }

    public class OrderBuy : Order
    {
    }

    public class OrderSell : Order
    {
    }
}
