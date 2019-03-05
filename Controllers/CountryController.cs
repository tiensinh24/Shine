using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Shine.Data;
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
    public class CountryController : ControllerBase
    {
        private readonly CountryRepository _repository;
        public CountryController(CountryRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Country>> GetCountries()
        {
            return _repository.GetCountryListDto().OrderBy(c => c.CountryName).ToList();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Country> GetCountry(int id)
        {
            var country = _repository.GetCountryDto(id);
            if (country == null)
            {
                return NotFound();
            }
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
            _repository.UpdateCountry(country);
            _repository.Commit();
            return country.Adapt<Country>();
        }

        [HttpDelete("{id}")]
        public ActionResult<int> DeleteCountry(int id)
        {
            _repository.DeleteCountry(id);
            _repository.Commit();
            return id;
        }

    }
}
