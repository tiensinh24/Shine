using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shine.Data;
using Shine.Data.Dto.Categories;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Controllers
{
    [Produces ("application/json")]
    [Route ("api/[controller]")]
    [Authorize]
    public class CategoryBuyController
    {
        private readonly CategoryBuyRepository _repository;

        public CategoryBuyController (CategoryBuyRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public IEnumerable<CategoryDto> GetCategories ()
        {
            return _repository.GetCategories ();
        }

        [HttpGet ("{id}")]
        public CategoryDto GetCategory (int id)
        {
            return _repository.GetCategory (id);
        }

        [HttpPost]
        public CategoryDto AddCategory ([FromBody] CategoryBuy categoryBuy)
        {
            _repository.Add (categoryBuy);
            _repository.Commit ();
            return categoryBuy.Adapt<CategoryDto> ();
        }

        [HttpDelete]
        public bool DeleteCategory (CategoryBuy categoryBuy)
        {
            try
            {
                _repository.Delete<CategoryBuy> (categoryBuy);
                _repository.Commit ();
                return true;
            }
            catch (System.Exception)
            {
                return false;
            }
        }

    }
}
