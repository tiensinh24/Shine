using System;

namespace Shine.Data.Dto.Suppliers
{
    public class SupplierDto
    {
        public int PersonId { get; set; }
        public string PersonNumber { get; set; }
        public bool Gender { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Telephone { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public int CountryId { get; set; }
    }
}
