using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Orders;
using Shine.Data.Dto.Orders.Sell;
using Shine.Data.Dto.Orders.Sell.Queries;
using Shine.Data.Dto.Orders.Sell.Reports;
using Shine.Data.Dto.Products;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface IOrderSellRepository : IRepository {

    #region Order

    #region Get Values
    Task<IEnumerable<OrderSellListDto>> GetOrdersAsync (
      Expression<Func<OrderSellListDto, object>> sortColumn, string sortOrder);

    Task<PagedList<OrderSellListDto>> GetPagedOrdersAsync (
      PagingParams pagingParams, SortParams sortParams, OrderSellQuery query, string filter
    );

    Task<OrderSellDetailDto> GetOrderDetailAsync (int orderId);

    Task<bool> IsOrderNumberExistAsync (string orderNumber);

    #endregion

    #region Actions
    Task<OrderSell> AddOrderAsync (OrderSell orderSell);

    Task<OrderSellDto> UpdateOrderAsync (OrderSell orderSell);

    Task<OrderSellDto> DeleteOrderAsync (int orderId);

    Task<bool> DeleteOrdersAsync (string[] ids);

    #endregion

    #endregion

    #region LineItems        

    #region Get Values


    Task<OrderSellProducts> GetOrderProductAsync (ProductOrder productOrder);

    #endregion

    #region Actions
    Task<ProductOrder> AddProductOrderAsync (ProductOrder productOrder);

    Task AddProductOrderRangeAsync (IEnumerable<ProductOrder> productOrders);

    Task<ProductOrder> UpdateProductOrderAsync (ProductOrder productOrder);

    Task<bool> DeleteProductOrderAsync (int orderId, int productId);

    #endregion

    #endregion

    #region Reports

    decimal GetOrdersSum (int year, int? month);
    decimal GetOrdersCostSum (int year, int? month);
    int GetOrdersCount (int year, int? month);
    Task<IEnumerable<OrderAndCostPerMonthDto>> GetOrderAndCostPerMonthAsync (int year);
    Task<IEnumerable<OrderAndCostPerQuarterDto>> GetOrderAndCostPerQuarterAsync (int year);
    Task<OrderSellLatestDto> GetLatestOrderAsync ();
    decimal GetTotalOrderDebt ();
    Task<IEnumerable<OrderValueDto>> GetTopOrderValueAsync (int numRows, int year, int month, string type);

    #endregion

  }
}