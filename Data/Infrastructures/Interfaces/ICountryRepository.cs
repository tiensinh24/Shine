using System.Collections.Generic;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ICountryRepository
    {
         IEnumerable<Country> GetCountryListDto();
         Country GetCountryDto(int id);
         void UpdateCountry(Country country);
         void DeleteCountry(int id);
    }
}