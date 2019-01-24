using System.Collections.Generic;

namespace Shine.Data.Models
{
    public class Category
    {
        #region Properties
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        #endregion

        #region Navigation Properties
        public IEnumerable<Product> Products { get; set; }
        #endregion
        
    }
}