using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Categories.Buy;
using Shine.Data.Models;

namespace Shine.Controllers.Interfaces {
    public interface ICategoryBuyController {
#region Get Values
        Task<ActionResult<IEnumerable<CategoryBuyDto>>> GetCategories();

        Task<ActionResult<Paged<CategoryBuyDto>>> GetPagedCategories(
            [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter);

        Task<ActionResult<CategoryBuyDto>> GetCategory(int id);
#endregion

#region Actions
        Task<ActionResult<CategoryBuyDto>> AddCategory([FromBody] CategoryBuy categoryBuy);

        Task<ActionResult<CategoryBuyDto>> UpdateCategory([FromBody] CategoryBuy categoryBuy);

        Task<ActionResult<CategoryBuyDto>> DeleteCategory(int id);

        Task<bool> DeleteCategories(string[] ids);
#endregion
    }
}
