using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Shine.Data;
using Shine.Data.Dto.Orders.Buy;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Controllers {
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderBuyController : ControllerBase {

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

#region CRUD

#region Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderBuyDto>>> GetOrders() {
            var orders = await _repository.GetOrdersAsync(o => o.DateOfIssue);

            return Ok(orders);
        }

        [HttpGet("{orderId}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<OrderBuyDto>> GetOrder(int orderId) {
            var order = await _repository.GetOrderAsync(orderId);

            if (order == null) {
                return NotFound();
            }

            return Ok(order);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<OrderBuyDto> AddOrder([FromBody] OrderBuy orderBuy) {
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
        public async Task<OrderBuyDto> UpdateOrder([FromBody] OrderBuy orderBuy) {
            try {
                _repository.UpdateOrder(orderBuy);
            } catch (Exception) {

                throw;
            }
            _repository.Commit();
            var order = await _repository.GetOrderAsync(orderBuy.OrderId);
            return order;
        }

        [HttpDelete("{id}")]
        public ActionResult<int> DeleteOrder(int id) {
            _repository.DeleteOrder(id);
            _repository.Commit();
            return id;
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
#endregion
#endregion

    }
}
