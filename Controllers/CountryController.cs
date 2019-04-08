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
using Shine.Data.Dto.Countries;
using Shine.Data.Dto.Products;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CountryController : ControllerBase, ICountryController
    {
        private readonly ICountryRepository _repository;
        public CountryController(ICountryRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CountryDto>>> GetCountries()
        {
            var query = await _repository.GetCountriesAsync(c => c.CountryName, "asc");

            return Ok(query);
        }

        [HttpGet("Select")]
        public async Task<ActionResult<IEnumerable<CountrySelectDto>>> GetCountriesSelect()
        {
            var query = await _repository.GetCountriesAsync(c => c.CountryName, "asc");

            var countries = query.Adapt<CountrySelectDto>();

            return Ok(countries);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CountryDto>> GetCountry(int id)
        {
            var country = await _repository.GetCountryAsync(id);

            if (country == null) return NotFound();

            return country;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Country> AddCountry([FromBody] Country country)
        {
            _repository.Add(country);
            _repository.Commit();
            return country.Adapt<Country>();
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Country> UpdateCountry([FromBody] Country country)
        {
            _repository.UpdateCountryAsync(country);
            _repository.Commit();
            return country.Adapt<Country>();
        }

        [HttpDelete("{id}")]
        public ActionResult<int> DeleteCountry(int id)
        {
            _repository.DeleteCountryAsync(id);
            _repository.Commit();
            return id;
        }

    }
}
