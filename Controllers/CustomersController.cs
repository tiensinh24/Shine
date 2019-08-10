using System.Collections.Generic;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shine.Controllers.Interfaces;
using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Customers;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Controllers {
    [Produces ("application/json")]
    [Route ("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CustomerController : ControllerBase, ICustomerController {
        #region Private Fields
        private readonly ICustomerRepository _repository;

        #endregion

        #region Constructor
        public CustomerController (ICustomerRepository repository) {
            this._repository = repository;
        }
        #endregion

        #region Customer

        #region Get Values

        [HttpGet ("select")]
        public async Task<ActionResult<IEnumerable<CustomerSelectDto>>> GetCustomersSelect () {
            var query = await _repository.GetCustomersSelectAsync ();

            return Ok (query);
        }

        [HttpGet ("paged")]
        public async Task<ActionResult<Paged<CustomerListDto>>> GetPagedCustomers (
            [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter) {
            var query = await _repository.GetPagedCustomersAsync (pagingParams, sortParams, filter);

            return new Paged<CustomerListDto> (query);
        }

        [HttpGet ("{customerId}/detail")]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CustomerDetailDto>> GetCustomerDetail (int customerId) {
            var customer = await _repository.GetCustomerDetailAsync (customerId);

            if (customer == null) {
                return NotFound ();
            }

            return customer;
        }

        [HttpGet("{customerId}")]
        public async Task<ActionResult<CustomerListDto>> GetCustomer(int customerId) {
            var customer = await _repository.GetCustomerAsync(customerId);

            if (customer == null) {
                return NotFound();
            }

            return customer;
        }

        #endregion Get Values

        #region Actions
        [HttpPost]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CustomerDto>> AddCustomer ([FromBody] Customer customer) {

            await _repository.AddCustomerAsync (customer);
            await _repository.CommitAsync ();

            return CreatedAtAction (nameof (GetCustomerDetail),
                new { id = customer.PersonId },
                customer.Adapt<CustomerDto> ());

        }

        [HttpPut]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CustomerDto>> UpdateCustomer ([FromBody] Customer customer) {
            var cus = await _repository.UpdateCustomerAsync (customer);

            if (cus == null) return NotFound ();

            await _repository.CommitAsync ();

            return cus;
        }

        [HttpDelete ("{id}")]
        public async Task<ActionResult<CustomerDto>> DeleteCustomer (int customerId) {
            var customer = await _repository.DeleteCustomerAsync (customerId);

            if (customer == null) return NotFound ();

            await _repository.CommitAsync ();

            return customer;
        }

        [HttpDelete ("delete-all")]
        public async Task<bool> DeleteCustomers ([FromHeader] string[] ids) {
            var query = await _repository.DeleteCustomersAsync (ids);

            if (query) {
                await _repository.CommitAsync ();
            }

            return query;
        }
        #endregion
        #endregion

        #region Orders

        [HttpGet ("{customerId}/orders")]
        public async Task<ActionResult<IEnumerable<CustomerOrdersDto>>> GetOrders (int customerId) {
            var orders = await _repository.GetOrdersAsync (customerId);

            return Ok (orders);
        }

        [HttpGet ("{customerId}/paged-orders")]
        public async Task<ActionResult<Paged<CustomerOrdersDto>>> GetPagedOrders (int supplierId, [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter) {
            var query = await _repository.GetPagedOrdersByCustomerAsync (
                pagingParams, sortParams, filter, supplierId);

            return new Paged<CustomerOrdersDto> (query);
        }

        #endregion

    }
}