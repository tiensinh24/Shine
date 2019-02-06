using System.Collections.Generic;
using Shine.Data.Dto.Categories;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ICategoryRepository
    {
        IEnumerable<CategoryListDto> GetCategories();
        CategoryListDto GetCategory(int id);
    }
}