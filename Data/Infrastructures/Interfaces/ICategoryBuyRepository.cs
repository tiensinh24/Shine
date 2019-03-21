using System.Collections.Generic;
using Shine.Data.Infrastructures.QueryParams;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ICategoryBuyRepository : IRepository
    {
        IEnumerable<CategoryBuy> GetCategories(BaseQueryParams queryParams);
        CategoryBuy GetCategory(int id);
        void UpdateCategory(CategoryBuy categoryBuy);
        void DeleteCategory(int id);

    }
}
