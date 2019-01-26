using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shine.Data.Models
{    
    public abstract class Invoice : BaseEntity
    {
        #region Properties
        public int InvoiceId { get; set; }
        [Required]
        [MaxLength(50)]
        public string InvoiceNumber { get; set; }
        [Required]
        public DateTime DateOfIssue { get; set; }
        public DateTime PaymentDateOne { get; set; }
        public decimal PaymentOne { get; set; }
        public DateTime PaymentDateTwo { get; set; }
        public decimal PaymentTwo { get; set; }        
        public DateTime TimeForPayment { get; set; }
        public bool InvoiceType { get; set; }
        #endregion

        #region FK
        public int PeopleId { get; set; }
        #endregion

        #region Navigation Properties
        public People People { get; set; }
        public IEnumerable<ProductInvoice> ProductInvoices { get; set; }
        public IEnumerable<Cost> Costs { get; set; }
        #endregion
    }

    public class  PurchasesInvoice : Invoice
    {
        [MaxLength(50)]
        public string LocalInvoiceNumber { get; set; }
        public DateTime LocalDateOfIssue { get; set; }
    }

    public class SalesInvoice : Invoice
    {
        [MaxLength(10)]
        public string Currency { get; set; }        
        public decimal RateOne { get; set; }        
        public decimal RateTwo { get; set; }

    }    
}
