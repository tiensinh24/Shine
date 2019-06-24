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

namespace Shine.Controllers.Interfaces
{
    public interface ISupplierController {
#region Supplier

#region Get Values
        Task<ActionResult<IEnumerable<SupplierListDto>>> GetSuppliers();

        Task<ActionResult<IEnumerable<SupplierSelectDto>>> GetSuppliersSelect();

        Task<ActionResult<Paged<SupplierListDto>>> GetPagedSuppliers(
            [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter);

        Task<ActionResult<SupplierDetailDto>> GetSupplier(int id);
#endregion

#region Actions
        Task<ActionResult<SupplierDto>> AddSupplier([FromBody] Supplier supplier);

        Task<ActionResult<SupplierDto>> UpdateSupplier([FromBody] Supplier supplier);

        Task<ActionResult<SupplierDto>> DeleteSupplier(int id);

        Task<bool> DeleteSuppliers(string[] ids);

#endregion

#endregion

#region SupplierProduct

#region Get Values

        Task<ActionResult<Paged<ProductsBySupplierDto>>> GetPagedProducts(
            int supplierId, [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter);

        Task<ActionResult<IEnumerable<ProductSelectDto>>> GetProductsForSelect(int supplierId);
#endregion

#region Actions
        Task AddSupplierProduct(PersonProduct model);

        Task<ActionResult<PersonProductDto>> DeleteSupplierProduct(PersonProduct model);
#endregion

#endregion

#region Orders

        Task<ActionResult<IEnumerable<SupplierOrdersDto>>> GetOrders(int supplierId);

        Task<ActionResult<Paged<SupplierOrdersDto>>> GetPagedOrders(
            int supplierId, [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter);

#endregion

#region Reports
    
    Task<ActionResult<Paged<SupplierDebtDto>>> GetPagedSupplierDebt(
            [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter);

    Task<ActionResult<IEnumerable<OrderDebtDto>>> GetOrderDebtsBySupplier(int supplierId);

    Task<ActionResult<IEnumerable<OrderBySupplierPivotMonthDto>>> GetOrderBySupplierPivotMonth(int year);

    Task<ActionResult<IEnumerable<OrderBySupplierPivotQuarterDto>>> GetOrderBySupplierPivotQuarter(int year);

#endregion

    }
}
