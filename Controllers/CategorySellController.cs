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
    public class CategorySellController
    {
        private readonly CategorySellRepository _repository;

        public CategorySellController(CategorySellRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public IEnumerable<CategorySellDto> GetCategories()
        {
            return _repository.GetCategoryListDto();
        }

        [HttpGet("{id}")]
        public CategorySellDto GetCategory(int id)
        {
            return _repository.GetCategoryDto(id);
        }

        [HttpPost]
        public void AddCategory([FromBody] CategorySell categorySell)
        {
            _repository.Add(categorySell);
            _repository.Commit();
        }

        [HttpPut]
        public void UpdateCategory([FromBody] CategorySell categorySell)
        {
            _repository.UpdateCategory(categorySell);
            _repository.Commit();
        }

        [HttpDelete("{id}")]
        public void DeleteCategory(int id)
        {
            _repository.DeleteCategory(id);
            _repository.Commit();
        }

    }
}