using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Orders;
using Shine.Data.Dto.Products;
using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Dto.Suppliers;
using Shine.Data.Dto.Suppliers.Reports;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ISupplierRepository : IRepository
    {
        #region Supplier

        #region Get Values
        Task<IEnumerable<SupplierSelectDto>> GetSuppliersSelectAsync();

        Task<PagedList<SupplierListDto>> GetPagedSuppliersAsync(
            PagingParams pagingParams, SortParams sortParams, string filter);

        Task<SupplierDetailDto> GetSupplierAsync(int supplierId);

        #endregion

        #region Actions
        Task AddSupplierAsync(Supplier supplier);

        Task<SupplierDto> UpdateSupplierAsync(Supplier supplier);

        Task<SupplierDto> DeleteSupplierAsync(int id);

        Task<bool> DeleteSuppliersAsync(string[] ids);

        #endregion

        #endregion

        #region SupplierProduct

        #region Get Values

        Task<IEnumerable<ProductSelectDto>> GetProductsForSelectAsync(int supplierId);

        Task<PagedList<ProductsBySupplierDto>> GetPagedProductsAsync(
            int supplierId, PagingParams pagingParams, SortParams sortParams, string filter);

        Task<PagedList<ProductsBySupplierDto>> GetPagedProductsNotAddedAsync(
            int supplierId, PagingParams pagingParams, SortParams sortParams, string filter);
        #endregion

        #region Actions
        Task<bool> AddSupplierProductAsync(PersonProduct model);

        Task<PersonProductDto> DeleteSupplierProductAsync(PersonProduct model);

        #endregion

        #endregion

        #region Orders

        Task<IEnumerable<SupplierOrdersDto>> GetOrdersAsync(int supplierId);

        Task<PagedList<SupplierOrdersDto>> GetPagedOrdersBySupplierAsync(
            PagingParams pagingParams, SortParams sortParams, string filter, int supplierId);

        #endregion

        #region Reports

        Task<PagedList<SupplierDebtDto>> GetPagedSupplierDebtAsync(
            PagingParams pagingParams, SortParams sortParams, string filter
        );

        Task<ActionResult<IEnumerable<OrderDebtDto>>> GetOrderDebtsBySupplierAsync(int supplierId);

        Task<IEnumerable<SupplierDebtDto>> GetTopSupplierDebtAsync(int numRows);

        Task<IEnumerable<OrderBySupplierPivotMonthDto>> GetOrderBySupplierPivotMonthAsync(int year);

        Task<IEnumerable<OrderBySupplierPivotQuarterDto>> GetOrderBySupplierPivotQuarterAsync(int year);


        #endregion


    }
}
