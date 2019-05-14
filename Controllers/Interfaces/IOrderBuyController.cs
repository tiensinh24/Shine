using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Orders.Buy;
using Shine.Data.Models;

namespace Shine.Controllers.Interfaces {
    public interface IOrderBuyController {

#region Order

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

#endregion

#endregion

#region LineItems

        Task<bool> AddOrderWithDetails([FromBody] OrderBuyWithDetailsToAddDto orderBuyWithDetailsToAdd);

        Task<ActionResult<ProductOrderDto>> AddProductOrder(int orderId, [FromBody] ProductOrder productOrder);

        Task<ActionResult<ProductOrderDto>> UpdateProductOrder(int orderId, int productId, [FromBody] ProductOrder productOrder);

        Task DeleteProductOrder(int orderId, int productId);

#endregion

    }
}
