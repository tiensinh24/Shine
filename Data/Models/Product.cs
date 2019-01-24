using System.Collections.Generic;

namespace Shine.Data.Models
{
    public enum ProductTypes
    {
        Buy, Sell
    }
    public abstract class Product
    {
        #region Constructor
        public Product()
        {
            
        }
        #endregion
        
        #region Properties
        public int ProductId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public ProductTypes ProductType { get; set; }

        #endregion

        #region FK
        public int CategoryId { get; set; }
        #endregion

        #region Navigation Properties
        public Category Category { get; set; }
        public IEnumerable<ProductInvoice> ProductInvoices { get; set; }
        #endregion
    }

    public class ProductBuy : Product
    {
        
    }

    public class ProductSell : Product
    {
        
    }
}