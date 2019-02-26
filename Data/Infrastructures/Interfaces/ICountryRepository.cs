using System.Collections.Generic;
using Shine.Data.Dto.Countries;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ICountryRepository
    {
         IEnumerable<CountryDto> GetCountryListDto();
         CountryDto GetCountryDto(int id);
         void UpdateCountry(Country country);
         void DeleteCountry(int id);
    }
}