using System.Collections.Generic;
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
            return _repository.GetAll();
        }

        [HttpGet("{id}")]
        public IEnumerable<Category> GetCategory(int id)
        {
            return _repository.GetByCondition(c => c.CategoryId == id, c => c.Products);
        }
    }
}