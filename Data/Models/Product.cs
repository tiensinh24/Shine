using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Shine.Data.Models
{    
    public abstract class Product
    {
        #region Constructor
        public Product()
        {
            
        }
        #endregion
        
        #region Properties
        public int ProductId { get; set; }
        [Required]
        public string Name { get; set; }
        public string Specification { get; set; }
        public decimal Price { get; set; }
        public bool ProductType { get; set; }

        #endregion

        #region FK
        public int CategoryId { get; set; }
        #endregion

        #region Navigation Properties
        public Category Category { get; set; }
        public IEnumerable<ProductInvoice> ProductInvoices { get; set; }
        public IEnumerable<PeopleProduct> PeopleProducts { get; set; }
        #endregion
    }

    public class ProductBuy : Product
    {
        
    }

    public class ProductSell : Product
    {
        
    }
}