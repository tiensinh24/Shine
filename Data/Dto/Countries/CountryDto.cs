namespace Shine.Data.Dto.Countries
{
    public class CountryDto
    {
        public int CountryId { get; set; }        
        public string ContinentName { get; set; }
        public string ContinentCode { get; set; }
        public string CountryName { get; set; }
        public string TwoLetterCountryCode { get; set; }
        public string ThreeLetterCountryCode { get; set; }
        public int CountryNumber { get; set; }
    }
}