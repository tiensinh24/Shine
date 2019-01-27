using System.ComponentModel.DataAnnotations;
using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models
{    
    public abstract class ProductOrder : IAuditedEntityBase, ISoftDelete
    {
        #region Properties        
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public string Specification { get; set; }
        [Required]
        public decimal Quantity { get; set; }
        [Required]
        public decimal Price { get; set; }
        public decimal Tax { get; set; }
        public bool ProductOrderType { get; set; }

        #endregion

        #region Navigation Properties
        public Product Product { get; set; }
        public Order Invoice { get; set; }
        #endregion
    }

    public class ProductOrderBuy : ProductOrder
    {
        [Required]
        public decimal Rate { get; set; }
        public string Unit { get; set; }
    }

    public class ProductOrderSell : ProductOrder
    {
        public decimal LocalQuantity { get; set; }
        public decimal LocalPrice { get; set; }
    }
}