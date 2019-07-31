using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models
{
    public class Photo : IAuditedEntityBase, ISoftDelete
    {

        #region Properties
        public int PhotoId { get; set; }

        // Used by cloudinary
        public string PublicId { get; set; }
        public string PhotoUrl { get; set; }
        public string Description { get; set; }
        public bool IsMain { get; set; }

        #endregion

        #region FK
        public int? PersonId { get; set; }
        public int? EmployeeId { get; set; }
        public int? ProductId { get; set; }
        #endregion

        #region Navigation Properties
        public Person Person { get; set; }
        public Employee Employee { get; set; }
        public Product Product { get; set; }
        #endregion
    }
}
