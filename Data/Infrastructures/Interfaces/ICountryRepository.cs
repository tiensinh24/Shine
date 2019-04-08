using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Shine.Data.Dto.Countries;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces {
    public interface ICountryRepository : IRepository {
        Task<IEnumerable<CountryDto>> GetCountriesAsync(
            Expression<Func<CountryDto, object>> softColumn, string sortOrder);

        Task<IEnumerable<CountrySelectDto>> GetCountriesSelectAsync();
        Task<CountryDto> GetCountryAsync(int id);

        Task AddCountryAsync(Country country);
        Task<CountryDto> UpdateCountryAsync(Country country);
        Task<CountryDto> DeleteCountryAsync(int id);
    }
}
