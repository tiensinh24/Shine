using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Orders.Buy;
using Shine.Data.Models;

namespace Shine.Controllers.Interfaces {
    public interface IOrderBuyController {
#region Get Values
        Task<ActionResult<IEnumerable<OrderBuyListDto>>> GetOrders();

        Task<ActionResult<Paged<OrderBuyListDto>>> GetPagedOrders(
            [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter);

        Task<ActionResult<OrderBuyDetailDto>> GetOrderDetail(int orderId);
#endregion

#region Actions
        Task<ActionResult<OrderBuyDto>> AddOrder([FromBody] OrderBuy orderBuy);

        Task<ActionResult<OrderBuyDto>> UpdateOrder([FromBody] OrderBuy orderBuy);

        Task<ActionResult<OrderBuyDto>> DeleteOrder(int orderId);

        Task<bool> DeleteOrders(string[] ids);
#endregion

    }
}
