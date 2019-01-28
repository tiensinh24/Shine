using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Shine.Data;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class CategoryController
    {
        private readonly CategoryRepository _repository;

        public CategoryController(CategoryRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public IEnumerable<Category> GetCategories()
        {
            return _repository.GetAll(c => c.Products);
        }

        [HttpGet("{id}")]
        public IEnumerable<Category> GetCategory(int id)
        {
            return _repository.GetByCondition(c => c.CategoryId == id, c => c.Products);
        }


        [HttpPost]
        public Category AddCategory([FromBody]Category category)
        {
            _repository.Add(category);
            _repository.Commit();
            return category;
        }

        [HttpDelete("{id}")]
        public bool DeleteCategory(int id)
        {
            try
            {
                _repository.Delete(c => c.CategoryId == id);
                _repository.Commit();
                return true;
            }
            catch (System.Exception)
            {
                return false;
                throw;
            }
        }
    }
}