using System;

namespace Shine.Data.Dto.Customers {
    public class CustomerListDto {
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
        public string Email { get; set; }
        public string Address { get; set; }
        public int CountryId { get; set; }
        public decimal Rating { get; set; }
        #endregion

        #region Countries Navigation
        public string CountryName { get; set; }
        public string ContinentName { get; set; }
        #endregion

        #region Photos Navigation
        public string PhotoUrl { get; set; }
        #endregion
    }
}