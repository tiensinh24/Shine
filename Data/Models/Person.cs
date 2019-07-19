using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models
{

    public abstract class Person : IAuditedEntityBase, ISoftDelete {
#region Properties
        public int PersonId { get; set; }
        public bool PersonType { get; set; }
        public string PersonNumber { get; set; }
        public bool Gender { get; set; }

        [Required]       
        public string FirstName { get; set; }

        [Required]        
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Telephone { get; set; }
        public string Fax { get; set; }
        public string Address { get; set; }
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

    public class Customer : Person, INotRoot {

    }

    public class Supplier : Person, INotRoot {

    }
}
