using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Products;
using Shine.Data.Dto.Products.Buy;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces {
    public interface IProductBuyRepository : IRepository {
#region Product

#region Get Values
        Task<IEnumerable<ProductBuyListDto>> GetProductsAsync(
            Expression<Func<ProductBuyListDto, object>> sortColumn, string sortOrder);

        Task<PagedList<ProductBuyListDto>> GetPagedProductsAsync(
            PagingParams pagingParams, SortParams sortParams, string filter,
            Expression<Func<ProductBuyListDto, bool>> condition);

        Task<ProductBuyDetailDto> GetProductAsync(int productId);

        Task<IEnumerable<ProductSelectDto>> GetProductsSelectAsync(
            Expression<Func<ProductBuy, bool>> condition
        );

#endregion

#region Actions
        Task AddProductAsync(ProductBuy productBuy);

        Task<ProductBuyDto> UpdateProductAsync(ProductBuy productBuy);

        Task<ProductBuyDto> DeleteProductAsync(int productId);

        Task<bool> DeleteProductsAsync(string[] ids);

#endregion

#endregion

#region StorageProduct

        Task<PagedList<ProductRemainDto>> GetPagedProductRemainsAsync(
            PagingParams pagingParams, SortParams sortParams, string filter);

        Task<IEnumerable<ProductStorageRemainDto>> GetProductRemainPerStoragesAsync(int productId);

#endregion

    }
}
