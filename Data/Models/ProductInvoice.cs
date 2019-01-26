using System.ComponentModel.DataAnnotations;

namespace Shine.Data.Models
{    
    public abstract class ProductInvoice : BaseEntity
    {
        #region Properties        
        public int ProductId { get; set; }
        public int InvoiceId { get; set; }
        public string Specification { get; set; }
        [Required]
        public decimal Quantity { get; set; }
        [Required]
        public decimal Price { get; set; }
        public decimal Tax { get; set; }
        public bool ProductInvoiceType { get; set; }

        #endregion

        #region Navigation Properties
        public Product Product { get; set; }
        public Invoice Invoice { get; set; }
        #endregion
    }

    public class ProductInvoiceBuy : ProductInvoice
    {
        [Required]
        public decimal Rate { get; set; }
        public string Unit { get; set; }
    }

    public class ProductInvoiceSell : ProductInvoice
    {
        public decimal LocalQuantity { get; set; }
        public decimal LocalPrice { get; set; }
    }
}