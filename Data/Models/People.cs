using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Shine.Data.Models
{
    public enum PeopleTypes
    {
        User = 0, Customer = 1, Supplier = 2, Employee = 3
    }

    public abstract class People
    {
        #region Properties
        public int PeopleId { get; set; }
        [Required]
        [MaxLength(5)]
        public string Gender { get; set; }
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        [MaxLength(50)]
        public string Email { get; set; }
        public string Telephone { get; set; }
        public string Fax { get; set; }
        public PeopleTypes PeopleType { get; set; }
        #endregion

        #region FK
        public int CountryId { get; set; }
        #endregion

        #region Navigation Properties
        public Country Country { get; set; }
        public IEnumerable<Invoice> Invoices { get; set; }
        public IEnumerable<PeopleProduct> PeopleProducts { get; set; }

        #endregion
    }

    public class User : People
    {

    }
    public class Customer : People
    {

    }

    public class Supplier : People
    {

    }

    public class Employee : People
    {

    }
}