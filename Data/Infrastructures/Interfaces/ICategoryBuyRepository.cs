using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Categories.Buy;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ICategoryBuyRepository : IRepository
    {
        Task<IEnumerable<CategoryBuySelectDto>> GetCategoriesAsync(
            Expression<Func<CategoryBuySelectDto, object>> sortColumn, string sortOrder);
        Task<PagedList<CategoryBuySelectDto>> GetPagedCategoriesAsync(
            PagingParams pagingParams, SortParams sortParams, string filter);
        Task<CategoryBuySelectDto> GetCategoryAsync(int id);
        void UpdateCategory(CategoryBuy categoryBuy);
        void DeleteCategory(int id);

    }
}
