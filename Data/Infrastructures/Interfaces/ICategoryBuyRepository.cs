using System.Collections.Generic;
using Shine.Data.Dto.Categories;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ICategoryBuyRepository
    {
        IEnumerable<CategoryBuyDto> GetCategories();
        CategoryBuyDto GetCategory(int id);
       
    }
}