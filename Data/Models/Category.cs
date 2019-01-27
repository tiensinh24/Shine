using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models
{
    public class Category : IAuditedEntityBase, ISoftDelete
    {
        #region Properties
        public int CategoryId { get; set; }
        [Required]
        [MaxLength(100)]
        public string CategoryName { get; set; }
        #endregion

        #region Navigation Properties
        public IEnumerable<Product> Products { get; set; }
        #endregion
        
    }
}