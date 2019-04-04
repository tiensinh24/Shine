using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Products.Buy;
using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Dto.Suppliers;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ISupplierRepository : IRepository
    {
#region Supplier

#region Get Values
        Task<IEnumerable<SupplierListDto>> GetSuppliersAsync(
            Expression<Func<SupplierListDto, object>> sortColumn, string sortOrder);

        Task<PagedList<SupplierListDto>> GetPagedSuppliersAsync(
            PagingParams pagingParams, SortParams sortParams, string filter);

        Task<SupplierListDto> GetSupplierAsync(int id);

#endregion

#region Actions
        Task AddSupplierAsync(Supplier supplier);

        Task<SupplierDto> UpdateSupplierAsync(Supplier supplier);

        Task<SupplierDto> DeleteSupplierAsync(int id);

#endregion       

#endregion

#region SupplierProduct

#region Get Values
        Task<IEnumerable<SupplierProductListDto>> GetSupplierProductsDto();

        IEnumerable<SupplierProductListDto> GetSuppliersByProduct(int productId);

        Task<IEnumerable<ProductBuyListDto>> GetProductsBySupplierAsync(int supplierId);

        Task<ProductsGroupBySupplierDto> GetProductsGroupBySupplierAsync(int supplierId);

        JsonResult GetProductsNotBySupplier(int supplierId);
#endregion

#region Actions
        Task AddSupplierProductAsync(PersonProduct model);

        Task<PersonProductDto> DeleteSupplierProductAsync(PersonProduct model);

#endregion

#endregion
    }
}
