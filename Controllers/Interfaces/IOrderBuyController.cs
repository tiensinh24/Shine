using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Orders;
using Shine.Data.Dto.Orders.Buy;
using Shine.Data.Dto.Orders.Buy.Queries;
using Shine.Data.Dto.Orders.Buy.Reports;
using Shine.Data.Models;

namespace Shine.Controllers.Interfaces {
    public interface IOrderBuyController {

#region Order

#region Get Values
        Task<ActionResult<IEnumerable<OrderBuyListDto>>> GetOrders();

        Task<ActionResult<Paged<OrderBuyListDto>>> GetPagedOrders(
            [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, [FromQuery] OrderBuyQuery query, string filter);

        Task<ActionResult<OrderBuyDetailDto>> GetOrderDetail(int orderId);
#endregion

#region Actions       

        Task<ActionResult<OrderBuy>> AddOrder([FromBody] OrderBuy orderBuy);

        Task<ActionResult<OrderBuyDto>> UpdateOrder([FromBody] OrderBuy orderBuy);

        Task<ActionResult<OrderBuyDto>> DeleteOrder(int orderId);

#endregion

#endregion

#region LineItems

        Task<ActionResult<ProductOrderDto>> AddProductOrder(int orderId, [FromBody] ProductOrder productOrder);

        Task<ActionResult<ProductOrderDto>> UpdateProductOrder(int orderId, int productId, [FromBody] ProductOrder productOrder);

        Task DeleteProductOrder(int orderId, int productId);

#endregion

#region Reports

        ActionResult<decimal> GetOrdersSum(int year, int? month);
        
        ActionResult<decimal> GetOrdersCostSum(int year, int? month);
        
        ActionResult<int> GetOrdersCount(int year, int? month);

        Task<ActionResult<IEnumerable<OrderAndCostPerMonthDto>>> GetOrderAndCostPerMonth(int year);

        Task<ActionResult<OrderBuyLatestDto>> GetLatestOrder();

        ActionResult<decimal> GetTotalOrderDebt();

        Task<ActionResult<IEnumerable<OrderValueDto>>> GetTopOrderValue(int numRows, int year, int? quarter, int? month);
    
#endregion
    }
}
