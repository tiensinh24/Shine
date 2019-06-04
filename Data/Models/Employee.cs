using System;
using System.Collections.Generic;

using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models {
    public class Employee : IAuditedEntityBase, ISoftDelete {

#region Properties

        public int EmployeeId { get; set; }
        public bool Gender { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Telephone { get; set; }

#endregion

#region FK

        public int CountryId { get; set; }
        public int DepartmentId { get; set; }

#endregion

#region Navigation Properties

        public Country Country { get; set; }
        public Department Department { get; set; }
        public IEnumerable<Photo> Photos { get; set; }
        public IEnumerable<Order> Orders { get; set; }

#endregion

    }
}
