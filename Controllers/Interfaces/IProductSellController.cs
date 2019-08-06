using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Products.Sell;
using Shine.Data.Models;

namespace Shine.Controllers.Interfaces {
    public interface IProductSellController {
        #region Get Values
        Task<ActionResult<Paged<ProductSellListDto>>> GetPagedProducts (
            [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter);

        Task<ActionResult<ProductSellDetailDto>> GetProduct (int productId);
        #endregion

        #region Actions
        Task<ActionResult<ProductSellDto>> AddProduct ([FromBody] ProductSell productSell);

        Task<ActionResult<ProductSellDto>> UpdateProduct ([FromBody] ProductSell productSell);

        Task<ActionResult<ProductSellDto>> DeleteProduct (int productId);

        Task<bool> DeleteProducts (string[] ids);
        #endregion
    }
}