using System.Collections.Generic;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shine.Controllers.Interfaces;
using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Orders;
using Shine.Data.Dto.Products;
using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Dto.Suppliers;
using Shine.Data.Dto.Suppliers.Reports;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Controllers {
    [Produces ("application/json")]
    [Route ("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SupplierController : ControllerBase, ISupplierController {
        #region Private Fields
        private readonly ISupplierRepository _repository;

        #endregion

        #region Constructor
        public SupplierController (ISupplierRepository repository) {
            this._repository = repository;
        }
        #endregion

        #region Supplier

        #region Get Values

        [HttpGet ("select")]
        public async Task<ActionResult<IEnumerable<SupplierSelectDto>>> GetSuppliersSelect () {
            var query = await _repository.GetSuppliersSelectAsync ();

            return Ok (query);
        }

        [HttpGet ("paged")]
        public async Task<ActionResult<Paged<SupplierListDto>>> GetPagedSuppliers (
            [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter) {
            var query = await _repository.GetPagedSuppliersAsync (pagingParams, sortParams, filter);

            return new Paged<SupplierListDto> (query);
        }

        [HttpGet ("{id}")]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        public async Task<ActionResult<SupplierDetailDto>> GetSupplier (int id) {
            var supplier = await _repository.GetSupplierAsync (id);

            if (supplier == null) {
                return NotFound ();
            }

            return supplier;
        }

        #endregion Get Values

        #region Actions
        [HttpPost]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<SupplierDto>> AddSupplier ([FromBody] Supplier supplier) {

            await _repository.AddSupplierAsync (supplier);
            await _repository.CommitAsync ();

            return CreatedAtAction (nameof (GetSupplier),
                new { id = supplier.PersonId },
                supplier.Adapt<SupplierDto> ());

        }

        [HttpPut]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<SupplierDto>> UpdateSupplier ([FromBody] Supplier supplier) {
            var sup = await _repository.UpdateSupplierAsync (supplier);

            if (sup == null) return NotFound ();

            await _repository.CommitAsync ();

            return sup;
        }

        [HttpDelete ("{id}")]
        public async Task<ActionResult<SupplierDto>> DeleteSupplier (int id) {
            var supplier = await _repository.DeleteSupplierAsync (id);

            if (supplier == null) return NotFound ();

            await _repository.CommitAsync ();

            return supplier;
        }

        [HttpDelete ("delete-all")]
        public async Task<bool> DeleteSuppliers ([FromHeader] string[] ids) {
            var query = await _repository.DeleteSuppliersAsync (ids);

            if (query) {
                await _repository.CommitAsync ();
            }

            return query;
        }
        #endregion
        #endregion

        #region SupplierProduct

        #region Get Values

        [HttpGet ("{supplierId}/products-for-select")]
        public async Task<ActionResult<IEnumerable<ProductSelectDto>>> GetProductsForSelect (int supplierId) {
            var products = await _repository.GetProductsForSelectAsync (supplierId);

            return Ok (products);
        }

        [HttpGet ("{supplierId}/paged-products")]
        public async Task<ActionResult<Paged<ProductsBySupplierDto>>> GetPagedProducts (
            int supplierId, [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter) {
            var query = await _repository.GetPagedProductsAsync (supplierId, pagingParams, sortParams, filter);

            return new Paged<ProductsBySupplierDto> (query);
        }

        [HttpGet ("{supplierId}/paged-products-not-added")]
        public async Task<ActionResult<Paged<ProductsBySupplierDto>>> GetPagedProductsNotAdded (
            int supplierId, [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter) {
            var query = await _repository.GetPagedProductsNotAddedAsync (supplierId, pagingParams, sortParams, filter);

            return new Paged<ProductsBySupplierDto> (query);
        }

        #endregion

        #region Actions
        [HttpPost ("product")]
        public async Task<bool> AddSupplierProduct (PersonProduct model) {
            var rs = await _repository.AddSupplierProductAsync (model);

            if (rs == true) {
                await _repository.CommitAsync ();
                return true;
            }

            return false;

        }

        [HttpDelete ("product")]
        public async Task<ActionResult<PersonProductDto>> DeleteSupplierProduct (PersonProduct model) {
            var entity = await _repository.DeleteSupplierProductAsync (model);

            if (entity == null) return NotFound ();

            await _repository.CommitAsync ();

            return entity;
        }

        #endregion

        #endregion

        #region Orders

        [HttpGet ("{supplierId}/orders")]
        public async Task<ActionResult<IEnumerable<SupplierOrdersDto>>> GetOrders (int supplierId) {
            var orders = await _repository.GetOrdersAsync (supplierId);

            return Ok (orders);
        }

        [HttpGet ("{supplierId}/paged-orders")]
        public async Task<ActionResult<Paged<SupplierOrdersDto>>> GetPagedOrders (int supplierId, [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter) {
            var query = await _repository.GetPagedOrdersBySupplierAsync (
                pagingParams, sortParams, filter, supplierId);

            return new Paged<SupplierOrdersDto> (query);
        }

        #endregion

        #region Reports

        [HttpGet ("debt")]
        public async Task<ActionResult<Paged<SupplierDebtDto>>> GetPagedSupplierDebt (
            [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter) {
            var query = await _repository.GetPagedSupplierDebtAsync (pagingParams, sortParams, filter);

            return new Paged<SupplierDebtDto> (query);
        }

        [HttpGet ("{supplierId}/debt")]
        public async Task<ActionResult<IEnumerable<OrderDebtDto>>> GetOrderDebtsBySupplier (int supplierId) {
            var orderDebts = await _repository.GetOrderDebtsBySupplierAsync (supplierId);

            return orderDebts;
        }

        [HttpGet ("report/pivot-month")]
        public async Task<ActionResult<IEnumerable<OrderBySupplierPivotMonthDto>>> GetOrderBySupplierPivotMonth (int year) {
            var query = await _repository.GetOrderBySupplierPivotMonthAsync (year);

            return Ok (query);
        }

        [HttpGet ("report/pivot-quarter")]
        public async Task<ActionResult<IEnumerable<OrderBySupplierPivotQuarterDto>>> GetOrderBySupplierPivotQuarter (int year) {
            var query = await _repository.GetOrderBySupplierPivotQuarterAsync (year);

            return Ok (query);
        }

        [HttpGet ("top-debt")]
        public async Task<ActionResult<IEnumerable<SupplierDebtDto>>> GetTopSupplierDebt (int numRows) {
            var query = await _repository.GetTopSupplierDebtAsync (numRows);

            return Ok (query);
        }

        #endregion

    }
}