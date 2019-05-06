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

        [HttpGet("{orderId}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<OrderBuyDetailDto>> GetOrder(int orderId) {
            var order = await _repository.GetOrderAsync(orderId);

            if (order == null) {
                return NotFound();
            }

            return Ok(order);
        }

#endregion

#region Actions

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<OrderBuyDetailDto> AddOrder([FromBody] OrderBuy orderBuy) {
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
        public async Task<OrderBuyDetailDto> UpdateOrder([FromBody] OrderBuy orderBuy) {
            try {
                await _repository.UpdateOrderAsync(orderBuy);
            } catch (Exception) {

                throw;
            }
            _repository.Commit();
            var order = await _repository.GetOrderAsync(orderBuy.OrderId);
            return order;
        }

        [HttpDelete("{orderId}")]
        public async Task<ActionResult<OrderBuyDto>> DeleteOrder(int orderId) {
            var order = await _repository.DeleteOrderAsync(orderId);

            if (order == null) return NotFound();

            await _repository.CommitAsync();

            return order;
        }
#endregion

#region ProductOrder
        [HttpGet("{orderId}/details")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<ProductOrderDto>>> GetProductDetailByOrder(int orderId) {
            var prodDetails = await _repository.GetProductDetailByOrder(orderId);
            if (prodDetails == null) {
                return NotFound();
            }
            return Ok(prodDetails);
        }

        [HttpPost("addProduct")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ProductOrderDto>> AddProductOrder([FromBody] ProductOrder productOrder) {
            var prodOrderAdded = await _repository.AddProductOrderAsync(productOrder);
            await _repository.CommitAsync();

            return await _context.ProductOrders.Include(p => p.Product)
                .ProjectToType<ProductOrderDto>()
                .FirstOrDefaultAsync(p => p.OrderId == prodOrderAdded.OrderId
                    && p.ProductId == prodOrderAdded.ProductId);
        }

        [HttpPost("addProducts")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task AddProductsOrder([FromBody] IEnumerable<ProductOrder> productOrders) {
            await _repository.AddProductOrderRangeAsync(productOrders);
            await _repository.CommitAsync();
        }

        [HttpPost("addWithDetails")]
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

        [HttpDelete("{orderId}/delete/{productId}")]
        public async Task DeleteProductOrder(int orderId, int productId) {
            await _repository.DeleteProductOrder(orderId, productId);
            await _repository.CommitAsync();
        }

        Task<ActionResult<OrderBuyDetailDto>> IOrderBuyController.GetOrder(int orderId) {
            throw new NotImplementedException();
        }

        Task<ActionResult<OrderBuyDto>> IOrderBuyController.AddOrder(OrderBuy orderBuy) {
            throw new NotImplementedException();
        }

        Task<ActionResult<OrderBuyDto>> IOrderBuyController.UpdateOrder(OrderBuy orderBuy) {
            throw new NotImplementedException();
        }

        Task<ActionResult<OrderBuyDto>> IOrderBuyController.DeleteOrder(int orderId) {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteOrders(string[] ids) {
            throw new NotImplementedException();
        }
#endregion

    }
}
