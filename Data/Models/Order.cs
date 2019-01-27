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
        public DateTime PaymentDateOne { get; set; }
        public decimal PaymentOne { get; set; }
        public DateTime PaymentDateTwo { get; set; }
        public decimal PaymentTwo { get; set; }        
        public DateTime TimeForPayment { get; set; }
        public bool OrderType { get; set; }
        #endregion

        #region FK
        public string UserId { get; set; }
        #endregion

        #region Navigation Properties
        public User User { get; set; }
        public IEnumerable<ProductOrder> ProductOrders { get; set; }
        public IEnumerable<Cost> Costs { get; set; }
        #endregion
    }

    public class  BuyOrder : Order
    {
        [MaxLength(50)]
        public string LocalOrderNumber { get; set; }
        public DateTime LocalDateOfIssue { get; set; }
    }

    public class SellOrder : Order
    {
        [MaxLength(10)]
        public string Currency { get; set; }        
        public decimal RateOne { get; set; }        
        public decimal RateTwo { get; set; }

    }    
}
