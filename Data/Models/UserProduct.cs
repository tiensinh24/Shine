using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models
{
    public class UserProduct : IAuditedEntityBase, ISoftDelete
    {
        #region Properties
        public int UserId { get; set; }
        public int ProductId { get; set; }
        #endregion

        #region Navigation Properties
        public User User { get; set; }
        public Product Product { get; set; }
        #endregion
    }
}