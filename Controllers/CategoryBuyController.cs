using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Shine.Data;
using Shine.Data.Dto;
using Shine.Data.Dto.Categories.Buy;
using Shine.Data.Helpers;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Infrastructures.QueryParams;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoryBuyController : ControllerBase
    {
        private readonly ICategoryBuyRepository _repository;

        public CategoryBuyController(ICategoryBuyRepository repository)
        {

            this._repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryBuySelectDto>>> GetCategories()
        {
            var query = await _repository.GetCategoriesAsync(c => c.CategoryName, false);
            return Ok(query);
        }

        [HttpGet("Paged")]

        public async Task<ActionResult<Paged<CategoryBuySelectDto>>> GetPagedCategories(int pageNumber, int pageSize)
        {
            var query = await _repository.GetPagedCategoriesAsync(pageNumber, pageSize, c => c.CategoryName, false);

            return new Paged<CategoryBuySelectDto>(query);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CategoryBuySelectDto>> GetCategory(int id)
        {
            var category = await _repository.GetCategoryAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<CategoryBuy> AddCategory([FromBody] CategoryBuy categoryBuy)
        {
            _repository.Add(categoryBuy);
            _repository.Commit();
            return categoryBuy;
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<CategoryBuy> UpdateCategory([FromBody] CategoryBuy categoryBuy)
        {
            _repository.UpdateCategory(categoryBuy);
            _repository.Commit();
            return categoryBuy;
        }

        [HttpDelete("{id}")]
        public ActionResult<int> DeleteCategory(int id)
        {
            _repository.DeleteCategory(id);
            _repository.Commit();

            return id;
        }

    }
}
