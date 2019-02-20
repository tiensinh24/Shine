using System.Collections.Generic;
using Shine.Data.Dto.Categories;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ICategoryBuyRepository
    {
        IEnumerable<CategoryBuyDto> GetCategoryListDto();
        CategoryBuyDto GetCategoryDto(int id);
        void UpdateCategory(CategoryBuy categoryBuy);
        void DeleteCategory(int id);

    }
}
