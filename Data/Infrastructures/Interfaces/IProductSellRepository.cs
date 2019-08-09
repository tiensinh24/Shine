using System.Collections.Generic;
using System.Threading.Tasks;
using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Products;
using Shine.Data.Dto.Products.Sell;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces {
    public interface IProductSellRepository : IRepository {
        #region Product

        #region Get Values
        Task<PagedList<ProductSellListDto>> GetPagedProductsAsync (
            PagingParams pagingParams, SortParams sortParams, string filter);

        Task<IEnumerable<ProductSelectDto>> GetProductsSelectAsync();

        Task<ProductSellDetailDto> GetProductAsync (int productId);

        #endregion

        #region Actions
        Task AddProductAsync (ProductSell productSell);

        Task<ProductSellDto> UpdateProductAsync (ProductSell productSell);

        Task<ProductSellDto> DeleteProductAsync (int productId);

        Task<bool> DeleteProductsAsync (string[] ids);

        #endregion

        #endregion

        #region StorageProduct

        Task<PagedList<ProductRemainDto>> GetPagedProductRemainsAsync (
            PagingParams pagingParams, SortParams sortParams, string filter);

        Task<IEnumerable<ProductStorageRemainDto>> GetProductRemainPerStoragesAsync (int productId);

        #endregion

    }
}