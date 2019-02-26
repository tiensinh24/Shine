using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shine.Data;
using Shine.Data.Dto.Categories;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Controllers
{
    [Produces ("application/json")]
    [Route ("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoryBuyController : ControllerBase
    {
        private readonly CategoryBuyRepository _repository;

        public CategoryBuyController (CategoryBuyRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<CategoryBuyDto>> GetCategories ()
        {
            return _repository.GetCategoryListDto().ToList();
        }

        [HttpGet ("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<CategoryBuyDto> GetCategory (int id)
        {
            var category = _repository.GetCategoryDto (id);
            if (category == null)
            {
                return NotFound();
            }
            return category;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<CategoryBuyDto> AddCategory ([FromBody] CategoryBuy categoryBuy)
        {
            _repository.Add (categoryBuy);
            _repository.Commit ();
            return categoryBuy.Adapt<CategoryBuyDto>();
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<CategoryBuyDto> UpdateCategory([FromBody]CategoryBuy categoryBuy)
        {
            _repository.UpdateCategory(categoryBuy);
            _repository.Commit();
            return categoryBuy.Adapt<CategoryBuyDto>();
        }

        [HttpDelete("{id}")]
        public ActionResult<int> DeleteCategory (int id)
        {            
                _repository.DeleteCategory(id);
                _repository.Commit ();

                return id;
        }

    }
}
