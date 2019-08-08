using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Customers;
using Shine.Data.Models;

namespace Shine.Controllers.Interfaces {
    public interface ICustomerController {
        #region Customer

        #region Get Values

        Task<ActionResult<IEnumerable<CustomerSelectDto>>> GetCustomersSelect ();

        Task<ActionResult<Paged<CustomerListDto>>> GetPagedCustomers (
            [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter);

        Task<ActionResult<CustomerDetailDto>> GetCustomer (int customerId);
        #endregion

        #region Actions
        Task<ActionResult<CustomerDto>> AddCustomer ([FromBody] Customer customer);

        Task<ActionResult<CustomerDto>> UpdateCustomer ([FromBody] Customer customer);

        Task<ActionResult<CustomerDto>> DeleteCustomer (int customerId);

        Task<bool> DeleteCustomers (string[] ids);

        #endregion

        #endregion

        #region Orders

        Task<ActionResult<IEnumerable<CustomerOrdersDto>>> GetOrders (int customerId);

        Task<ActionResult<Paged<CustomerOrdersDto>>> GetPagedOrders (
            int customerId, [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter);

        #endregion

    }
}