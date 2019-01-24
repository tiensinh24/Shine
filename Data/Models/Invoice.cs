using System;
using System.Collections;
using System.Collections.Generic;

namespace Shine.Data.Models
{
    public enum InvoiceTypes
    {
        Buy, Sell
    }
    public abstract class Invoice
    {
        #region Properties
        public int InvoiceId { get; set; }
        public string InvoiceNumber { get; set; }
        public DateTime DateOfIssue { get; set; }
        public DateTime PaymentDateOne { get; set; }
        public decimal PaymentOne { get; set; }        
        public DateTime PaymentDateTwo { get; set; }
        public decimal PaymentTwo { get; set; }        
        public DateTime TimeForPayment { get; set; }
        public InvoiceTypes InvoiceType { get; set; }
        #endregion

        #region FK
        public int PeopleId { get; set; }
        #endregion

        #region Navigation Properties
        public People People { get; set; }
        public IEnumerable<ProductInvoice> ProductInvoices { get; set; }
        #endregion
    }

    public class SalesInvoice : Invoice
    {
        public string Currency { get; set; }
        public decimal RateOne { get; set; }
        public decimal RateTwo { get; set; }

    }

    public class  PurchasesInvoice : Invoice
    {
        public string LocalInvoiceNumber { get; set; }
        public DateTime LocalDateOfIssue { get; set; }
    }
}