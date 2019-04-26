using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Photos;
using Shine.Data.Dto.Products.Buy;
using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Dto.Suppliers;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces {
    public interface ISupplierRepository : IRepository {
#region Supplier

#region Get Values
        Task<IEnumerable<SupplierListDto>> GetSuppliersAsync(
            Expression<Func<SupplierListDto, object>> sortColumn, string sortOrder);

        Task<PagedList<SupplierListDto>> GetPagedSuppliersAsync(
            PagingParams pagingParams, SortParams sortParams, string filter);

        Task<SupplierDetailDto> GetSupplierAsync(int id);

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
        Task<IEnumerable<SupplierProductListDto>> GetSupplierProductsListAsync();

        Task<IEnumerable<ProductsBySupplierDto>> GetProductsBySupplierAsync(int supplierId);

        Task<PagedList<ProductsBySupplierDto>> GetPagedProductsBySupplierAsync(
            PagingParams pagingParams, SortParams sortParams, string filter,
            Expression<Func<ProductsBySupplierDto, bool>> condition);

        JsonResult GetProductsNotBySupplier(int supplierId);
#endregion

#region Actions
        Task AddSupplierProductAsync(PersonProduct model);

        Task<PersonProductDto> DeleteSupplierProductAsync(PersonProduct model);

#endregion

#endregion

    }
}
