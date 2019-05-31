using System.Collections.Generic;

using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models {
    public class Department : IAuditedEntityBase, ISoftDelete {

#region Properties

        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }

#endregion

#region Navigation Properties

        public IEnumerable<Employee> Employees { get; set; }

#endregion

    }
}
