using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Orders.Buy;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces {
    public interface IOrderBuyRepository : IRepository {

#region Get Values
        Task<IEnumerable<OrderBuyListDto>> GetOrdersAsync(
            Expression<Func<OrderBuyListDto, object>> sortColumn, string sortOrder);

        Task<PagedList<OrderBuyListDto>> GetPagedOrdersAsync(
            PagingParams pagingParams, SortParams sortParams, string filter,
            Expression<Func<OrderBuyListDto, bool>> condition);

        Task<OrderBuyDetailDto> GetOrderAsync(int orderId);

#endregion

#region Actions
        Task<OrderBuy> AddOrderAsync(OrderBuy orderBuy);

        Task<OrderBuyDto> UpdateOrderAsync(OrderBuy orderBuy);

        Task<OrderBuyDto> DeleteOrderAsync(int orderId);

        Task<bool> DeleteOrdersAsync(string[] ids);

#endregion

#region ProductsOrder
        Task<IEnumerable<ProductOrderDto>> GetProductDetailByOrderAsync(int id);

        Task<ProductOrder> AddProductOrderAsync(ProductOrder productOrder);

        Task AddProductOrderRangeAsync(IEnumerable<ProductOrder> productOrders);

        Task DeleteProductOrderAsync(int orderId, int productId);

#endregion

    }
}
