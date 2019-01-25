using System.ComponentModel.DataAnnotations;

namespace Shine.Data.Models
{
    public class Cost
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
        public Invoice Invoice { get; set; }
        #endregion
    }
}