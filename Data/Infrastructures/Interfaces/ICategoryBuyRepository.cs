using System.Collections.Generic;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ICategoryBuyRepository
    {
        IEnumerable<CategoryBuy> GetCategoryListDto();
        CategoryBuy GetCategoryDto(int id);
        void UpdateCategory(CategoryBuy categoryBuy);
        void DeleteCategory(int id);

    }
}
