using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Shine.Controllers.Interfaces;
using Shine.Data;
using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Orders;
using Shine.Data.Dto.Orders.Sell;
using Shine.Data.Dto.Orders.Sell.Queries;
using Shine.Data.Dto.Orders.Sell.Reports;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderSellController : ControllerBase, IOrderSellController
    {

        #region Private Field
        private readonly IOrderSellRepository _repository;
        private readonly AppDbContext _context;

        #endregion

        #region Constructor
        public OrderSellController(IOrderSellRepository repository,
            AppDbContext context)
        {
            this._repository = repository;
            this._context = context;
        }

        #endregion

        #region Order

        #region Get Values

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderSellListDto>>> GetOrders()
        {
            var orders = await _repository.GetOrdersAsync(o => o.DateOfIssue, "asc");

            return Ok(orders);
        }

        [HttpGet("paged")]
        public async Task<ActionResult<Paged<OrderSellListDto>>> GetPagedOrders(
            [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams,
            [FromQuery] OrderSellQuery query, string filter)
        {
            var orders = await _repository.GetPagedOrdersAsync(pagingParams, sortParams, query, filter);

            return new Paged<OrderSellListDto>(orders);
        }

        [HttpGet("{orderId}/detail")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<OrderSellDetailDto>> GetOrderDetail(int orderId)
        {
            var order = await _repository.GetOrderDetailAsync(orderId);

            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        [HttpGet("is-order-number-exist")]
        public async Task<bool> IsOrderNumberExist(string orderNumber)
        {
            return await _repository.IsOrderNumberExistAsync(orderNumber);
        }

        #endregion

        #region Actions

        [HttpPost]
        public async Task<ActionResult<OrderSell>> AddOrder([FromBody] OrderSell orderSell)
        {
            var query = await _repository.GetByIdAsync<OrderSell>(o => o.OrderNumber == orderSell.OrderNumber);

            if (query == null)
            {
                var order = await _repository.AddOrderAsync(orderSell);

                if (order != null)
                {
                    await _repository.CommitAsync();
                }

                return order;
            }
            return Conflict("Order number already exist");
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<OrderSellDto>> UpdateOrder([FromBody] OrderSell orderSell)
        {

            var query = await _repository.UpdateOrderAsync(orderSell);

            if (query == null) return NotFound();

            await _repository.CommitAsync();

            return query;
        }

        [HttpDelete("{orderId}")]
        public async Task<ActionResult<OrderSellDto>> DeleteOrder(int orderId)
        {
            var order = await _repository.DeleteOrderAsync(orderId);

            if (order == null) return NotFound();

            await _repository.CommitAsync();

            return order;
        }
        #endregion

        #endregion

        #region LineItems

        #region Get Values


        #endregion

        #region Actions        

        [HttpPost("{orderId}/add-item")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<OrderSellProducts>> AddProductOrder(int orderId, [FromBody] ProductOrder productOrder)
        {
            var lineItem = await _repository.AddProductOrderAsync(productOrder);

            if (lineItem != null)
            {
                await _repository.CommitAsync();
            }

            var rs = await _repository.GetOrderProductAsync(lineItem);
            return rs;
        }

        [HttpPut("{orderId}/products/{productId}")]
        public async Task<ActionResult<OrderSellProducts>> UpdateProductOrder(int orderId, int productId, [FromBody] ProductOrder productOrder)
        {
            var updateItem = await _repository.UpdateProductOrderAsync(productOrder);

            if (updateItem == null) return NotFound();

            await _repository.CommitAsync();

            var itemReturn = await _repository.GetOrderProductAsync(updateItem);

            return itemReturn;
        }

        [HttpDelete("{orderId}/delete/{productId}")]
        public async Task<bool> DeleteProductOrder(int orderId, int productId)
        {
            var isSuccess = await _repository.DeleteProductOrderAsync(orderId, productId);

            if (isSuccess == true)
            {
                await _repository.CommitAsync();
            }

            return isSuccess;

        }

        #endregion

        #endregion

        #region Reports

        [HttpGet("value-total")]
        public ActionResult<decimal> GetOrdersSum(int year, int? month)
        {
            return _repository.GetOrdersSum(year, month);
        }

        [HttpGet("cost-total")]
        public ActionResult<decimal> GetOrdersCostSum(int year, int? month)
        {
            return _repository.GetOrdersCostSum(year, month);
        }

        [HttpGet("count")]
        public ActionResult<int> GetOrdersCount(int year, int? month)
        {
            return _repository.GetOrdersCount(year, month);
        }

        [HttpGet("order-and-cost-per-month")]
        public async Task<ActionResult<IEnumerable<OrderAndCostPerMonthDto>>> GetOrderAndCostPerMonth(int year)
        {
            var query = await _repository.GetOrderAndCostPerMonthAsync(year);

            return Ok(query);
        }

        [HttpGet("order-and-cost-per-quarter")]
        public async Task<ActionResult<IEnumerable<OrderAndCostPerQuarterDto>>> GetOrderAndCostPerQuarter(int year)
        {
            var query = await _repository.GetOrderAndCostPerQuarterAsync(year);

            return Ok(query);
        }

        [HttpGet("latest")]
        public async Task<ActionResult<OrderSellLatestDto>> GetLatestOrder()
        {
            var query = await _repository.GetLatestOrderAsync();

            return query;
        }

        [HttpGet("total-debt")]
        public ActionResult<decimal> GetTotalOrderDebt()
        {
            return _repository.GetTotalOrderDebt();
        }

        [HttpGet("top-value")]
        public async Task<ActionResult<IEnumerable<OrderValueDto>>> GetTopOrderValue(int numRows, int year, int month, string type)
        {
            var orders = await _repository.GetTopOrderValueAsync(numRows, year, month, type);

            return Ok(orders);
        }

        #endregion

    }
}
