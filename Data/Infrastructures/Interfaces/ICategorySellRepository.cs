using System.Collections.Generic;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ICategorySellRepository : IRepository
    {
        IEnumerable<CategorySell> GetCategories ();
        CategorySell GetCategory (int id);
        void UpdateCategory(CategorySell categorySell);
        void DeleteCategory(int id);
    }
}
