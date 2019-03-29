using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Scripting;
using Microsoft.CodeAnalysis.Scripting;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Categories.Buy;
using Shine.Data.Helpers;
using Shine.Data.Infrastructures.Interfaces;
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
            var query = await _repository.GetCategoriesAsync(c => c.CategoryName, "asc");
            return Ok(query);
        }

        [HttpGet("Paged")]

        public async Task<ActionResult<Paged<CategoryBuySelectDto>>> GetPagedCategories(
            [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter)
        {

            var query = await _repository.GetPagedCategoriesAsync(pagingParams, sortParams, filter);

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
