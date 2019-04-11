using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Categories.Buy;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces {
    public interface ICategoryBuyRepository : IRepository {
#region Get Values
        Task<IEnumerable<CategoryBuyDto>> GetCategoriesAsync(
            Expression<Func<CategoryBuyDto, object>> sortColumn, string sortOrder);

        Task<PagedList<CategoryBuyDto>> GetPagedCategoriesAsync(
            PagingParams pagingParams, SortParams sortParams, string filter);

        Task<CategoryBuyDto> GetCategoryAsync(int id);
#endregion

#region Actions
        Task AddCategoryAsync(CategoryBuy categoryBuy);

        Task<CategoryBuyDto> UpdateCategoryAsync(CategoryBuy categoryBuy);

        Task<CategoryBuyDto> DeleteCategoryAsync(int id);

        Task<bool> DeleteCategoriesAsync(string[] ids);
#endregion

    }
}
