using System;

namespace Shine.Data.Dto.Suppliers
{
    public class SupplierListDto
    {
#region Properties
        public int PersonId { get; set; }
        public string PersonNumber { get; set; }
        public bool Gender { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Telephone { get; set; }
        public string Fax { get; set; }
        public int CountryId { get; set; }
#endregion

#region Countries Navigation
        public string CountryName { get; set; }
        public string ContinentName { get; set; }
#endregion

    }
}
