using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Categories.Buy;
using Shine.Data.Helpers;
using Shine.Data.Infrastructures.QueryParams;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ICategoryBuyRepository : IRepository
    {
        Task<IEnumerable<CategoryBuySelectDto>> GetCategoriesAsync(
            Expression<Func<CategoryBuySelectDto, object>> sortColumn, string sortOrder);
        Task<PagedList<CategoryBuySelectDto>> GetPagedCategoriesAsync(
            PagingParams pagingParams, SortParams sortParams, string filter);
        IEnumerable<CategoryBuy> GetCategoriesWithBaseParams(BaseQueryParams queryParams);
        Task<CategoryBuySelectDto> GetCategoryAsync(int id);
        void UpdateCategory(CategoryBuy categoryBuy);
        void DeleteCategory(int id);

    }
}
