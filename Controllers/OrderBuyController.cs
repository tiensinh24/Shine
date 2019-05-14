using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Shine.Controllers.Interfaces;
using Shine.Data;
using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Orders.Buy;
using Shine.Data.Dto.Products;
using Shine.Data.Dto.Products.Buy;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Controllers {
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderBuyController : ControllerBase, IOrderBuyController {

#region Private Field
        private readonly IOrderBuyRepository _repository;
        private readonly AppDbContext _context;

#endregion

#region Constructor
        public OrderBuyController(IOrderBuyRepository repository,
            AppDbContext context) {
            this._repository = repository;
            this._context = context;
        }

#endregion

#region Order

#region Get Values

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderBuyListDto>>> GetOrders() {
            var orders = await _repository.GetOrdersAsync(o => o.DateOfIssue, "asc");

            return Ok(orders);
        }

        [HttpGet("paged")]
        public async Task<ActionResult<Paged<OrderBuyListDto>>> GetPagedOrders(
            [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter) {
            var query = await _repository.GetPagedOrdersAsync(pagingParams, sortParams, filter, null);

            return new Paged<OrderBuyListDto>(query);
        }

        [HttpGet("{orderId}/detail")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<OrderBuyDetailDto>> GetOrderDetail(int orderId) {
            var order = await _repository.GetOrderDetailAsync(orderId);

            if (order == null) {
                return NotFound();
            }

            return Ok(order);
        }

#endregion

#region Actions

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<OrderBuyDto>> AddOrder([FromBody] OrderBuy orderBuy) {
            try {
                await _repository.AddAsync(orderBuy);
            } catch (Exception) {
                throw;
            }
            await _repository.CommitAsync();
            var order = await _repository.GetOrderAsync(orderBuy.OrderId);
            return order;
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<OrderBuyDto>> UpdateOrder([FromBody] OrderBuy orderBuy) {

            var query = await _repository.UpdateOrderAsync(orderBuy);

            if (query == null) return NotFound();

            await _repository.CommitAsync();

            return query;
        }

        [HttpDelete("{orderId}")]
        public async Task<ActionResult<OrderBuyDto>> DeleteOrder(int orderId) {
            var order = await _repository.DeleteOrderAsync(orderId);

            if (order == null) return NotFound();

            await _repository.CommitAsync();

            return order;
        }
#endregion

#endregion

#region LineItems

#region Get Values

        [HttpGet("{orderId}/products-not-added-by-supplier-{supplierId}/select")]
        public async Task<ActionResult<IEnumerable<ProductSelectDto>>> GetTest(int orderId, int supplierId) {
            var query = await _repository.GetProductsNotAddedToOrderBySupplierForSelect(orderId, supplierId);

            return Ok(query);
        }

#endregion

#region Actions

        // Add new order with items
        [HttpPost("add-with-items")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<bool> AddOrderWithDetails([FromBody] OrderBuyWithDetailsToAddDto orderBuyWithDetailsToAdd) {
            var orderBuyToAdd = orderBuyWithDetailsToAdd.OrderBuy;
            var prodDetailsToAdd = orderBuyWithDetailsToAdd.ProductOrders.ToList();

            try {
                var orderAdded = await _repository.AddOrderAsync(orderBuyToAdd);
                prodDetailsToAdd.ForEach(p => p.OrderId = orderAdded.OrderId);
                await _repository.AddProductOrderRangeAsync(prodDetailsToAdd);
            } catch (System.Exception) {
                return false;
                throw;
            }
            await _repository.CommitAsync();
            return true;
        }

        [HttpPost("{orderId}/add-item")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ProductOrderDto>> AddProductOrder(int orderId, [FromBody] ProductOrder productOrder) {
            var lineItem = await _repository.AddProductOrderAsync(productOrder);

            if (lineItem != null) {
                await _repository.CommitAsync();
            }

            return lineItem.Adapt<ProductOrderDto>();
        }

        [HttpPut("{orderId}/products/{productId}")]
        public async Task<ActionResult<ProductOrderDto>> UpdateProductOrder(int orderId, int productId, [FromBody] ProductOrder productOrder) {
            var lineItem = await _repository.UpdateProductOrderAsync(productOrder);

            if (lineItem == null) return NotFound();

            await _repository.CommitAsync();

            return lineItem;
        }

        [HttpDelete("{orderId}/delete/{productId}")]
        public async Task DeleteProductOrder(int orderId, int productId) {
            await _repository.DeleteProductOrderAsync(orderId, productId);
            await _repository.CommitAsync();
        }

#endregion

#endregion

    }
}
