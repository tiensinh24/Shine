using System.Collections.Generic;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Shine.Controllers.Interfaces;
using Shine.Data;
using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Orders;
using Shine.Data.Dto.Orders.Buy;
using Shine.Data.Dto.Orders.Buy.Queries;
using Shine.Data.Dto.Orders.Buy.Reports;
using Shine.Data.Dto.Products;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Controllers
{
  [Produces("application/json")]
  [Route("api/[controller]")]
  [ApiController]
  [Authorize]
  public class OrderBuyController : ControllerBase, IOrderBuyController
  {

    #region Private Field
    private readonly IOrderBuyRepository _repository;
    private readonly AppDbContext _context;

    #endregion

    #region Constructor
    public OrderBuyController(IOrderBuyRepository repository,
        AppDbContext context)
    {
      this._repository = repository;
      this._context = context;
    }

    #endregion

    #region Order

    #region Get Values

    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderBuyListDto>>> GetOrders()
    {
      var orders = await _repository.GetOrdersAsync(o => o.DateOfIssue, "asc");

      return Ok(orders);
    }

    [HttpGet("paged")]
    public async Task<ActionResult<Paged<OrderBuyListDto>>> GetPagedOrders(
        [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams,
        [FromQuery] OrderBuyQuery query, string filter)
    {
      var orders = await _repository.GetPagedOrdersAsync(pagingParams, sortParams, query, filter);

      return new Paged<OrderBuyListDto>(orders);
    }

    [HttpGet("{orderId}/detail")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<OrderBuyDetailDto>> GetOrderDetail(int orderId)
    {
      var order = await _repository.GetOrderDetailAsync(orderId);

      if (order == null)
      {
        return NotFound();
      }

      return Ok(order);
    }

    #endregion

    #region Actions

    [HttpPost]
    public async Task<ActionResult<OrderBuy>> AddOrder([FromBody] OrderBuy orderBuy)
    {
      var query = await _repository.GetByIdAsync<OrderBuy>(o => o.OrderNumber == orderBuy.OrderNumber);

      if (query == null)
      {
        var order = await _repository.AddOrderAsync(orderBuy);

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
    public async Task<ActionResult<OrderBuyDto>> UpdateOrder([FromBody] OrderBuy orderBuy)
    {

      var query = await _repository.UpdateOrderAsync(orderBuy);

      if (query == null) return NotFound();

      await _repository.CommitAsync();

      return query;
    }

    [HttpDelete("{orderId}")]
    public async Task<ActionResult<OrderBuyDto>> DeleteOrder(int orderId)
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

    [HttpGet("{orderId}/products-not-added-by-supplier-{supplierId}/select")]
    public async Task<ActionResult<IEnumerable<ProductSelectDto>>> GetTest(int orderId, int supplierId)
    {
      var query = await _repository.GetProductsNotAddedToOrderBySupplierForSelect(orderId, supplierId);

      return Ok(query);
    }

    #endregion

    #region Actions        

    [HttpPost("{orderId}/add-item")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ProductOrderDto>> AddProductOrder(int orderId, [FromBody] ProductOrder productOrder)
    {
      var lineItem = await _repository.AddProductOrderAsync(productOrder);

      if (lineItem != null)
      {
        await _repository.CommitAsync();
      }

      return lineItem.Adapt<ProductOrderDto>();
    }

    [HttpPut("{orderId}/products/{productId}")]
    public async Task<ActionResult<ProductOrderDto>> UpdateProductOrder(int orderId, int productId, [FromBody] ProductOrder productOrder)
    {
      var lineItem = await _repository.UpdateProductOrderAsync(productOrder);

      if (lineItem == null) return NotFound();

      await _repository.CommitAsync();

      return lineItem;
    }

    [HttpDelete("{orderId}/delete/{productId}")]
    public async Task DeleteProductOrder(int orderId, int productId)
    {
      await _repository.DeleteProductOrderAsync(orderId, productId);
      await _repository.CommitAsync();
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

    [HttpGet("latest")]
    public async Task<ActionResult<OrderBuyLatestDto>> GetLatestOrder()
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
    public async Task<ActionResult<IEnumerable<OrderValueDto>>> GetTopOrderValue(int numRows, int year, int? quarter, int? month)
    {
      var orders = await _repository.GetTopOrderValueAsync(numRows, year, quarter, month);

      return Ok(orders);
    }

    #endregion

  }
}
