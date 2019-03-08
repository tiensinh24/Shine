using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shine.Data;
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
        public ActionResult<IEnumerable<CategoryBuy>> GetCategories ()
        {
            return _repository.GetCategories().ToList();
        }

        [HttpGet ("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<CategoryBuy> GetCategory (int id)
        {
            var category = _repository.GetCategory (id);
            if (category == null)
            {
                return NotFound();
            }
            return category;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<CategoryBuy> AddCategory ([FromBody] CategoryBuy categoryBuy)
        {
            _repository.Add (categoryBuy);
            _repository.Commit ();
            return categoryBuy;
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<CategoryBuy> UpdateCategory([FromBody]CategoryBuy categoryBuy)
        {
            _repository.UpdateCategory(categoryBuy);
            _repository.Commit();
            return categoryBuy;
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
