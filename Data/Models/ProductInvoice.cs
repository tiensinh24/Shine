namespace Shine.Data.Models
{
    public enum ProductInvoiceTypes
    {
        Buy, Sell
    }
    public abstract class ProductInvoice
    {
        #region Properties        
        public int ProductId { get; set; }
        public int InvoiceId { get; set; }
        public string Specification { get; set; }
        public decimal Quantity { get; set; }
        public decimal Price { get; set; }        
        public decimal Tax { get; set; }
        public ProductInvoiceTypes ProductInvoiceType { get; set; }

        #endregion

        #region Navigation Properties
        public Product Product { get; set; }
        public Invoice Invoice { get; set; }
        #endregion
    }

    public class ProductInvoiceBuy : ProductInvoice
    {
        public decimal Rate { get; set; }
        public string Unit { get; set; }
    }

    public class ProductInvoiceSell : ProductInvoice
    {
        public decimal LocalQuantity { get; set; }
        public decimal LocalPrice { get; set; }
    }
}