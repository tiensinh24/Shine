using System;
using System.Collections.Generic;

namespace Shine.Data.Dto.Suppliers {
    public class SupplierDetailDto {

#region Properties
        public int PersonId { get; set; }
        public string PersonNumber { get; set; }
        public bool Gender { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Telephone { get; set; }
        public string Fax { get; set; }
        public int CountryId { get; set; }
#endregion

#region Countries Navigation
        public string CountryName { get; set; }
        public string ContinentName { get; set; }
#endregion

#region Photos Navigation
        public IEnumerable<string> PhotosUrl { get; set; }
#endregion
    }
}
