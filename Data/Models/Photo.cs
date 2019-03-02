using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models
{
    public class Photo : IAuditedEntityBase, ISoftDelete
    {
#region Properties
        public int PhotoId { get; set; }
        public string Url { get; set; }
#endregion

#region FK
        public int PersonId { get; set; }
#endregion

#region Navigation Properties
        public Person Person { get; set; }
#endregion
    }
}
