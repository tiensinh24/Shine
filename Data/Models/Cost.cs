using System;
using System.ComponentModel.DataAnnotations;
using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models
{
    public class Cost : IAuditedEntityBase, ISoftDelete
    {
        #region Properties
        public int CostId { get; set; }
        public DateTime CostDate { get; set; }

        [Required]
        [MaxLength(100)]
        public string Description { get; set; }
        [Required]
        public decimal Amount { get; set; }
        public bool Currency { get; set; }
        public double Rate { get; set; }
        #endregion

        #region FK
        public int OrderId { get; set; }
        #endregion

        #region Navigation Properties
        public Order Order { get; set; }
        #endregion
    }
}