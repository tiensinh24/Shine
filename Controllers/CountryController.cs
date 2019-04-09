using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Shine.Controllers.Interfaces;
using Shine.Data;
using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Countries;
using Shine.Data.Dto.Products;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Controllers {
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CountryController : ControllerBase, ICountryController {

#region Private Fields
        private readonly ICountryRepository _repository;
#endregion

#region Constructor
        public CountryController(ICountryRepository repository) {
            this._repository = repository;
        }
#endregion

#region Get Values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CountryDto>>> GetCountries() {
            var query = await _repository.GetCountriesAsync(c => c.CountryName, "asc");

            return Ok(query);
        }

        [HttpGet("select")]
        public async Task<ActionResult<IEnumerable<CountrySelectDto>>> GetCountriesSelect() {
            var query = await _repository.GetCountriesSelectAsync();

            return Ok(query);
        }

        [HttpGet("paged")]
        public Task<ActionResult<Paged<CountryDto>>> GetPagedCountries(
            [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter) {
            throw new NotImplementedException();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CountryDto>> GetCountry(int id) {
            var country = await _repository.GetCountryAsync(id);

            if (country == null) return NotFound();

            return country;
        }
#endregion

#region Actions
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CountryDto>> AddCountry([FromBody] Country country) {
            await _repository.AddAsync(country);
            await _repository.CommitAsync();

            return CreatedAtAction(nameof(GetCountry),
                new { id = country.CountryId },
                country.Adapt<CountryDto>());
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CountryDto>> UpdateCountry([FromBody] Country country) {
            var query = await _repository.UpdateCountryAsync(country);

            if (query == null) return NotFound();

            await _repository.CommitAsync();

            return query.Adapt<CountryDto>();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<CountryDto>> DeleteCountry(int id) {
            var country = await _repository.DeleteCountryAsync(id);

            if (country == null) return NotFound();

            await _repository.CommitAsync();

            return country.Adapt<CountryDto>();
        }

#endregion

    }
}
