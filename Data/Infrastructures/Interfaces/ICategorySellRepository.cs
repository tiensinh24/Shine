using System.Collections.Generic;
using Shine.Data.Dto.Categories;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ICategorySellRepository
    {
        IEnumerable<CategorySellDto> GetCategories ();
        CategorySellDto GetCategory (int id);
    }
}
