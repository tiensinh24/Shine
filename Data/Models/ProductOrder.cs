using System.ComponentModel.DataAnnotations;
using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models
{    
    public class ProductOrder : IAuditedEntityBase
    {
        #region Properties        
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        [Required]
        public decimal Quantity { get; set; }
        [Required]
        public decimal Price { get; set; }
        public decimal Tax { get; set; }
        public decimal Rate { get; set; }
        public string Unit { get; set; }

        #endregion

        #region Navigation Properties
        public Product Product { get; set; }
        public Order Order { get; set; }
        #endregion
    }
}