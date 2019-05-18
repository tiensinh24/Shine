using System;
using System.Collections.Generic;

using Shine.Data.Dto.Photos;

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
        public decimal Rating { get; set; }

#endregion

#region Countries Navigation
        public string CountryName { get; set; }
        public string ContinentName { get; set; }
#endregion

#region Photos Navigation
        public IEnumerable<PhotoForPersonDto> Photos { get; set; }
#endregion
    }
}
