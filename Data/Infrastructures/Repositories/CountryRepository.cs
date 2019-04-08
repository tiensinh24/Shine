using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Shine.Data.Dto.Countries;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories
{
    public class CountryRepository : Repository, ICountryRepository
    {
#region Constructor        
        public CountryRepository(AppDbContext context, RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager, IConfiguration configuration
        ) : base(context, roleManager, userManager, configuration) { }
#endregion

#region Get Values
        public async Task<IEnumerable<CountryDto>> GetCountriesAsync(
            Expression<Func<CountryDto, object>> sortColumn = null, string sortOrder = "asc")
        {
            var query = _context.Countries.AsNoTracking()
                .ProjectToType<CountryDto>();

            if (sortColumn != null)
            {
                if (sortOrder == "desc")
                {
                    query = query.OrderByDescending(sortColumn);
                }
                else
                {
                    query = query.OrderBy(sortColumn);
                }
            }
            else
            {
                query = query.OrderBy(c => c.CountryName);
            }

            return await query.ToListAsync();

        }

        public async Task<CountryDto> GetCountryAsync(int id)
        {
            var query = await _context.Countries
                .AsNoTracking()
                .ProjectToType<CountryDto>()
                .FirstOrDefaultAsync(c => c.CountryId == id);

            return query;
        }
#endregion

#region Actions

        public async Task AddCountryAsync(Country country)
        {
            await _context.Countries.AddAsync(country);
        }

        public async Task<CountryDto> UpdateCountryAsync(Country country)
        {
            var countryEdit = await _context.Countries
                .FirstOrDefaultAsync(c => c.CountryId == country.CountryId);

            if (countryEdit != null)
            {
                countryEdit.ContinentName = country.ContinentName;
                countryEdit.ContinentCode = country.ContinentCode;
                countryEdit.CountryName = country.ContinentName;
                countryEdit.TwoLetterCountryCode = country.TwoLetterCountryCode;
                countryEdit.ThreeLetterCountryCode = country.ThreeLetterCountryCode;
                countryEdit.CountryNumber = country.CountryNumber;
            }

            return countryEdit.Adapt<CountryDto>();
        }

        public async Task<CountryDto> DeleteCountryAsync(int id)
        {
            var country = await _context.Countries
                .FirstOrDefaultAsync(c => c.CountryId == id);

            if (country != null)
            {
                _context.Countries.Remove(country);
            }

            return country.Adapt<CountryDto>();
        }
#endregion
    }
}
