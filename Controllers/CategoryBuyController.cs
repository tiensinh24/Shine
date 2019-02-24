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
        public IEnumerable<CategoryBuyDto> GetCategories ()
        {
            return _repository.GetCategoryListDto();
        }

        [HttpGet ("{id}")]
        public CategoryBuyDto GetCategory (int id)
        {
            return _repository.GetCategoryDto (id);
        }

        [HttpPost]
        public CategoryBuyDto AddCategory ([FromBody] CategoryBuy categoryBuy)
        {
            _repository.Add (categoryBuy);
            _repository.Commit ();
            return categoryBuy.Adapt<CategoryBuyDto>();
        }

        [HttpPut]
        public CategoryBuyDto UpdateCategory([FromBody]CategoryBuy categoryBuy)
        {
            _repository.UpdateCategory(categoryBuy);
            _repository.Commit();
            return categoryBuy.Adapt<CategoryBuyDto>();
        }

        [HttpDelete("{id}")]
        public int DeleteCategory (int id)
        {            
                _repository.DeleteCategory(id);
                _repository.Commit ();

                return id;
        }

    }
}
