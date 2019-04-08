using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Countries;
using Shine.Data.Models;

namespace Shine.Controllers.Interfaces
{
    public interface ICountryController
    {
#region Get Values
        Task<ActionResult<IEnumerable<CountryDto>>> GetCountries();
        Task<ActionResult<IEnumerable<CountrySelectDto>>> GetCountriesSelect();

        Task<ActionResult<Paged<CountryDto>>> GetPagedCountries(
            [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter);

        Task<ActionResult<CountryDto>> GetCountry(int id);
#endregion

#region Actions
        Task<ActionResult<CountryDto>> AddCategory([FromBody] Country country);

        Task<ActionResult<CountryDto>> UpdateCategory([FromBody] Country country);

        Task<ActionResult<CountryDto>> DeleteCountry(int id);
#endregion
    }
}
