using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models
{
    public class PersonProduct : IAuditedEntityBase
    {
        #region Properties
        public int PersonId { get; set; }
        public int ProductId { get; set; }
        #endregion

        #region Navigation Properties
        public Person Person { get; set; }
        public Product Product { get; set; }
        #endregion
    }
}