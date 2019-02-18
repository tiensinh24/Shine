using System.Collections.Generic;
using Shine.Data.Dto.Categories;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ICategoryBuyRepository
    {
        IEnumerable<CategoryDto> GetCategories();
        CategoryDto GetCategory(int id);
       
    }
}