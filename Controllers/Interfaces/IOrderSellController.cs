using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Orders;
using Shine.Data.Dto.Orders.Sell;
using Shine.Data.Dto.Orders.Sell.Queries;
using Shine.Data.Dto.Orders.Sell.Reports;
using Shine.Data.Models;

namespace Shine.Controllers.Interfaces {
    public interface IOrderSellController {

        #region Order

        #region Get Values
        Task<ActionResult<IEnumerable<OrderSellListDto>>> GetOrders ();

        Task<ActionResult<Paged<OrderSellListDto>>> GetPagedOrders (
            [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, [FromQuery] OrderSellQuery query, string filter);

        Task<ActionResult<OrderSellDetailDto>> GetOrderDetail (int orderId);

        Task<bool> IsOrderNumberExist (string orderNumber);

        #endregion

        #region Actions       

        Task<ActionResult<OrderSell>> AddOrder ([FromBody] OrderSell orderSell);

        Task<ActionResult<OrderSellDto>> UpdateOrder ([FromBody] OrderSell orderSell);

        Task<ActionResult<OrderSellDto>> DeleteOrder (int orderId);

        #endregion

        #endregion

        #region LineItems

        Task<ActionResult<OrderSellProducts>> AddProductOrder (int orderId, [FromBody] ProductOrder productOrder);

        Task<ActionResult<OrderSellProducts>> UpdateProductOrder (int orderId, int productId, [FromBody] ProductOrder productOrder);

        Task<bool> DeleteProductOrder (int orderId, int productId);

        #endregion

        #region Reports

        ActionResult<decimal> GetOrdersSum (int year, int? month);

        ActionResult<decimal> GetOrdersCostSum (int year, int? month);

        ActionResult<int> GetOrdersCount (int year, int? month);

        Task<ActionResult<IEnumerable<OrderAndCostPerMonthDto>>> GetOrderAndCostPerMonth (int year);
        Task<ActionResult<IEnumerable<OrderAndCostPerQuarterDto>>> GetOrderAndCostPerQuarter (int year);

        Task<ActionResult<OrderSellLatestDto>> GetLatestOrder ();

        ActionResult<decimal> GetTotalOrderDebt ();

        Task<ActionResult<IEnumerable<OrderValueDto>>> GetTopOrderValue (int numRows, int year, int month, string type);

        #endregion
    }
}