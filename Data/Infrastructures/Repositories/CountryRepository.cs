using System.Collections.Generic;
using System.Linq;
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

        public IEnumerable<CountryDto> GetCountryListDto()
        {
            return _context.Countries.ProjectToType<CountryDto>().AsNoTracking();

        }

        public CountryDto GetCountryDto(int id)
        {
            return _context.Countries.ProjectToType<CountryDto>()
                .FirstOrDefault(c => c.CountryId == id);
        }

        public void UpdateCountry(Country country)
        {
            var countryEdit = _context.Countries.FirstOrDefault(c => c.CountryId == country.CountryId);
            if (countryEdit != null)
            {
                countryEdit.ContinentName = country.ContinentName;
                countryEdit.ContinentCode = country.ContinentCode;
                countryEdit.CountryName = country.ContinentName;
                countryEdit.TwoLetterCountryCode = country.TwoLetterCountryCode;
                countryEdit.ThreeLetterCountryCode = country.ThreeLetterCountryCode;
                countryEdit.CountryNumber = country.CountryNumber;
            }
        }

        public void DeleteCountry(int id)
        {
            var country = _context.Countries.FirstOrDefault(c => c.CountryId == id);
            if (country != null)
            {
                _context.Countries.Remove(country);
            }
        }
    }
}
