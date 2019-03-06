using System;
using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models
{
    public class Payment : IAuditedEntityBase, ISoftDelete
    {
#region Properties        
        public int PaymentId { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal Amount { get; set; }
        public bool Currency { get; set; }
        public decimal Rate { get; set; }
#endregion

#region FK
        public int OrderId { get; set; }
#endregion

#region Navigation Properties
        public Order Order { get; set; }
#endregion
    }
}
