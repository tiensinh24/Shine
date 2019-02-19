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
    public class CategorySellController
    {
        private readonly CategorySellRepository _repository;

        public CategorySellController (CategorySellRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public IEnumerable<CategorySellDto> GetCategories ()
        {
            return _repository.GetCategories();
        }

        [HttpGet ("{id}")]
        public CategorySellDto GetCategory (int id)
        {
            return _repository.GetCategory (id);
        }

        [HttpPost]
        public CategorySellDto AddCategory ([FromBody] CategorySell categorySell)
        {
            _repository.Add (categorySell);
            _repository.Commit ();
            return categorySell.Adapt<CategorySellDto> ();
        }

        [HttpDelete]
        public bool DeleteCategory (CategorySell categorySell)
        {
            try
            {
                _repository.Delete<CategorySell> (categorySell);
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
