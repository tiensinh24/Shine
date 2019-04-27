using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Products.Buy;
using Shine.Data.Models;

namespace Shine.Controllers.Interfaces {
    public interface IProductBuyController {
#region Get Values
        Task<ActionResult<IEnumerable<ProductBuyListDto>>> GetProducts();

        Task<ActionResult<Paged<ProductBuyListDto>>> GetPagedProducts(
            [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter);

        Task<ActionResult<ProductBuyDetailDto>> GetProduct(int productId);
#endregion

#region Actions
        Task<ActionResult<ProductBuyDto>> AddProduct([FromBody] ProductBuy productBuy);

        Task<ActionResult<ProductBuyDto>> UpdateProduct([FromBody] ProductBuy productBuy);

        Task<ActionResult<ProductBuyDto>> DeleteProduct(int productId);

        Task<bool> DeleteProducts(string[] ids);
#endregion
    }
}
