using System.Collections.Generic;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ICategorySellRepository
    {
        IEnumerable<CategorySell> GetCategoryListDto ();
        CategorySell GetCategoryDto (int id);
        void UpdateCategory(CategorySell categorySell);
        void DeleteCategory(int id);
    }
}
