using System.ComponentModel.DataAnnotations;
using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models
{
    public class Cost : IAuditedEntityBase, ISoftDelete
    {
        #region Properties
        public int CostId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        public decimal Value { get; set; }
        #endregion

        #region FK
        public int InvoiceId { get; set; }
        #endregion

        #region Navigation Properties
        public Order Invoice { get; set; }
        #endregion
    }
}