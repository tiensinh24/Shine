using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Orders.Buy;
using Shine.Data.Dto.Products;
using Shine.Data.Dto.Products.Buy;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces {
    public interface IOrderBuyRepository : IRepository {

#region Order

#region Get Values
        Task<IEnumerable<OrderBuyListDto>> GetOrdersAsync(
            Expression<Func<OrderBuyListDto, object>> sortColumn, string sortOrder);

        Task<PagedList<OrderBuyListDto>> GetPagedOrdersAsync(
            PagingParams pagingParams, SortParams sortParams, string filter,
            Expression<Func<OrderBuyListDto, bool>> condition);

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

    }
}
