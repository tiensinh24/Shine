using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Products.Buy;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces {
    public interface IProductBuyRepository : IRepository {
#region Get Values
        Task<IEnumerable<ProductBuyListDto>> GetProductsAsync(
            Expression<Func<ProductBuyListDto, object>> sortColumn, string sortOrder);

        Task<PagedList<ProductBuyListDto>> GetPagedProductsAsync(
            PagingParams pagingParams, SortParams sortParams, string filter,
            Expression<Func<ProductBuyListDto, bool>> condition);

        Task<ProductBuyListDto> GetProductAsync(int id);
#endregion

#region Actions
        Task AddProductAsync(ProductBuy productBuy);

        Task<ProductBuyDto> UpdateProductAsync(ProductBuy productBuy);

        Task<ProductBuyDto> DeleteProductAsync(int id);

#endregion
    }
}
