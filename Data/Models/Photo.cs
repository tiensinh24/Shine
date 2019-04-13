using System;

using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models {
    public class Photo : IAuditedEntityBase, ISoftDelete {

#region Properties
        public int PhotoId { get; set; }

        // Use by cloudinary
        public string PublicId { get; set; }
        public string PhotoUrl { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }

#endregion

#region FK
        public int PersonId { get; set; }
#endregion

#region Navigation Properties
        public Person Person { get; set; }
#endregion
    }
}
