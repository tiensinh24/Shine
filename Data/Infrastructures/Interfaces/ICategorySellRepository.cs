using System.Collections.Generic;
using Shine.Data.Dto.Categories;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ICategorySellRepository
    {
        IEnumerable<CategorySellDto> GetCategoryListDto ();
        CategorySellDto GetCategoryDto (int id);
        void UpdateCategory(CategorySell categorySell);
        void DeleteCategory(int id);
    }
}
