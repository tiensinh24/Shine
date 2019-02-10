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
    [Produces("application/json")]
    [Route("api/[controller]")]
    [Authorize]
    public class CategoryController
    {
        private readonly CategoryRepository _repository;

        public CategoryController(CategoryRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public IEnumerable<CategoryDto> GetCategories()
        {
            return _repository.GetCategories();
        }

        [HttpGet("{id}")]
        public CategoryDto GetCategory(int id)
        {
            return _repository.GetCategory(id);
        }

        [HttpPost]
        public CategoryDto AddCategory([FromBody] Category category)
        {
            _repository.Add(category);
            _repository.Commit();
            return category.Adapt<CategoryDto>();
        }

        [HttpDelete]
        public bool DeleteCategory(Category category)
        {
            try
            {
                _repository.Delete<Category>(category);
                _repository.Commit();
                return true;
            }
            catch (System.Exception)
            {
                return false;
            }
        }
    }
}
