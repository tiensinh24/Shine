using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using Microsoft.AspNetCore.Identity;

using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models {
    public enum PersonType {
        Employee = 0, Customer = 1, Supplier = 2
    }
    public abstract class Person : IAuditedEntityBase, ISoftDelete {
#region Properties
        public int PersonId { get; set; }
        public PersonType PersonType { get; set; }
        public string PersonNumber { get; set; }
        public bool Gender { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Telephone { get; set; }
        public string Fax { get; set; }
#endregion

#region FK
        public int CountryId { get; set; }
#endregion

#region Navigation Properties
        public Country Country { get; set; }
        public IEnumerable<Order> Orders { get; set; }
        public IEnumerable<PersonProduct> PersonProducts { get; set; }
        public IEnumerable<Photo> Photos { get; set; }

#endregion
    }

    public class Employee : Person, INotRoot {

    }

    public class Customer : Person, INotRoot {

    }

    public class Supplier : Person, INotRoot {

    }
}
