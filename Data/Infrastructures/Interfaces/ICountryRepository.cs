using System.Collections.Generic;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ICountryRepository
    {
         IEnumerable<Country> GetCountries();
         Country GetCountry(int id);
         void UpdateCountry(Country country);
         void DeleteCountry(int id);
    }
}