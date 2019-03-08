using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Shine.Data.Dto.Orders.Buy;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderBuyController : ControllerBase
    {
#region Private Field
        private readonly OrderBuyRepository _repository;
#endregion

#region Constructor
        public OrderBuyController(OrderBuyRepository repository)
        {
            this._repository = repository;
        }

#endregion

#region CRUD
#region Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderBuyDto>>> GetOrders()
        {
            var orders = await _repository.GetOrdersAsync(o => o.DateOfIssue);

            return Ok(orders);
        }

        [HttpGet("{orderId}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<OrderBuyDto>> GetOrder(int orderId)
        {
            var order = await _repository.GetOrderAsync(orderId);

            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<OrderBuyDto> AddOrder([FromBody] OrderBuy orderBuy)
        {
            try
            {
                await _repository.AddAsync(orderBuy);
            }
            catch (Exception)
            {
                throw;
            }
            await _repository.CommitAsync();
            var order = await _repository.GetOrderAsync(orderBuy.OrderId);
            return order;
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<OrderBuyDto> UpdateOrder([FromBody] OrderBuy orderBuy)
        {
            try
            {
                _repository.UpdateOrder(orderBuy);
            }
            catch (Exception)
            {

                throw;
            }
            _repository.Commit();
            var order = await _repository.GetOrderAsync(orderBuy.OrderId);
            return order;
        }
#endregion
#region OrderProduct
        [HttpPost("addProduct")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task AddProductOrder([FromBody]ProductOrder productOrder)
        {
            await _repository.AddProductOrderAsync(productOrder);
            await _repository.CommitAsync();
        }

        [HttpPost("addProducts")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task AddProductsOrder([FromBody] IEnumerable<ProductOrder> productOrders)
        {
            await _repository.AddProductOrderRangeAsync(productOrders);
            await _repository.CommitAsync();
        }
#endregion
#endregion

    }
}
