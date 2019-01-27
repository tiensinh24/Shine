using System.Collections.Generic;
using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models
{
    public class Country : IAuditedEntityBase, ISoftDelete
    {
        #region Properties
        public int CountryId { get; set; }        
        public string ContinentName { get; set; }
        public string ContinentCode { get; set; }
        public string CountryName { get; set; }
        public string TwoLetterCountryCode { get; set; }
        public string ThreeLetterCountryCode { get; set; }
        public int CountryNumber { get; set; }
        #endregion

        #region Navigation Properties
        public IEnumerable<User> Peoples { get; set; }
        #endregion
    }
}