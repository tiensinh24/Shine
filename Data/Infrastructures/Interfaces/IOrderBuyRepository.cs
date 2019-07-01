using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Orders;
using Shine.Data.Dto.Orders.Buy;
using Shine.Data.Dto.Orders.Buy.Queries;
using Shine.Data.Dto.Orders.Buy.Reports;
using Shine.Data.Dto.Products;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
  public interface IOrderBuyRepository : IRepository {

#region Order

#region Get Values
        Task<IEnumerable<OrderBuyListDto>> GetOrdersAsync(
            Expression<Func<OrderBuyListDto, object>> sortColumn, string sortOrder);

        Task<PagedList<OrderBuyListDto>> GetPagedOrdersAsync(
            PagingParams pagingParams, SortParams sortParams, OrderBuyQuery query, string filter
            );

        Task<OrderBuyDto> GetOrderAsync(int orderId);

        Task<OrderBuyDetailDto> GetOrderDetailAsync(int orderId);

#endregion

#region Actions
        Task<OrderBuy> AddOrderAsync(OrderBuy orderBuy);

        Task<OrderBuyDto> UpdateOrderAsync(OrderBuy orderBuy);

        Task<OrderBuyDto> DeleteOrderAsync(int orderId);

        Task<bool> DeleteOrdersAsync(string[] ids);

#endregion

#endregion

#region LineItems        

#region Get Values

        Task<IEnumerable<ProductSelectDto>> GetProductsNotAddedToOrderBySupplierForSelect(int orderId, int supplierId);

#endregion

#region Actions
        Task<ProductOrder> AddProductOrderAsync(ProductOrder productOrder);

        Task AddProductOrderRangeAsync(IEnumerable<ProductOrder> productOrders);

        Task<ProductOrderDto> UpdateProductOrderAsync(ProductOrder productOrder);

        Task DeleteProductOrderAsync(int orderId, int productId);

#endregion

#endregion

#region Reports
    
    decimal GetOrdersSum(int year, int? month);    
    decimal GetOrdersCostSum(int year, int? month);
    int GetOrdersCount(int year, int? month);
    Task<IEnumerable<OrderAndCostPerMonthDto>> GetOrderAndCostPerMonthAsync(int year);
    Task<IEnumerable<OrderAndCostPerQuarterDto>> GetOrderAndCostPerQuarterAsync(int year);
    Task<OrderBuyLatestDto> GetLatestOrderAsync();
    decimal GetTotalOrderDebt();
    Task<IEnumerable<OrderValueDto>> GetTopOrderValueAsync(int numRows, int year, int month, string type);

#endregion

    }
}
