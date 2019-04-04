using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Suppliers;
using Shine.Data.Models;

namespace Shine.Controllers.Interfaces
{
    public interface ISupplierController
    {
#region Supplier

#region Get Values
        Task<ActionResult<IEnumerable<SupplierListDto>>> GetSuppliers();

        Task<ActionResult<Paged<SupplierListDto>>> GetPagedSuppliers(
            [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter);

        Task<ActionResult<SupplierListDto>> GetSupplier(int id);
#endregion

#region Actions
        Task<ActionResult<SupplierDto>> AddSupplier([FromBody] Supplier supplier);

        Task<ActionResult<SupplierDto>> UpdateSupplier([FromBody] Supplier supplier);

        Task<ActionResult<SupplierDto>> DeleteSupplier(int id);

#endregion

#endregion

#region SupplierProduct

#region Get Values
    
#endregion

#region Actions
        Task<IActionResult> AddSupplierProduct(PersonProduct model);

        Task<IActionResult> DeleteSupplierProduct(PersonProduct model);
#endregion
    
#endregion

    }
}
