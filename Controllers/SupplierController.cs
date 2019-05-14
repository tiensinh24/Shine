using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Shine.Controllers.Interfaces;
using Shine.Data;
using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Products;
using Shine.Data.Dto.Products.Buy;
using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Dto.Suppliers;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Controllers {
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SupplierController : ControllerBase, ISupplierController {
#region Private Fields
        private readonly ISupplierRepository _repository;

#endregion

#region Constructor
        public SupplierController(ISupplierRepository repository) {
            this._repository = repository;
        }
#endregion

#region Supplier

#region Get Values

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SupplierListDto>>> GetSuppliers() {
            var query = await _repository.GetSuppliersAsync(s => s.FullName, "asc");

            return Ok(query);
        }

        [HttpGet("select")]
        public async Task<ActionResult<IEnumerable<SupplierSelectDto>>> GetSuppliersSelect() {
            var query = await _repository.GetSuppliersSelectAsync(s => s.FullName, "asc");

            return Ok(query);
        }

        [HttpGet("paged")]
        public async Task<ActionResult<Paged<SupplierListDto>>> GetPagedSuppliers(
            [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter) {
            var query = await _repository.GetPagedSuppliersAsync(pagingParams, sortParams, filter);

            return new Paged<SupplierListDto>(query);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<SupplierDetailDto>> GetSupplier(int id) {
            var supplier = await _repository.GetSupplierAsync(id);

            if (supplier == null) {
                return NotFound();
            }

            return supplier;
        }

#endregion Get Values

#region Actions
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<SupplierDto>> AddSupplier([FromBody] Supplier supplier) {

            await _repository.AddSupplierAsync(supplier);
            await _repository.CommitAsync();

            return CreatedAtAction(nameof(GetSupplier),
                new { id = supplier.PersonId },
                supplier.Adapt<SupplierDto>());

        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<SupplierDto>> UpdateSupplier([FromBody] Supplier supplier) {
            var sup = await _repository.UpdateSupplierAsync(supplier);

            if (sup == null) return NotFound();

            await _repository.CommitAsync();

            return sup;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<SupplierDto>> DeleteSupplier(int id) {
            var supplier = await _repository.DeleteSupplierAsync(id);

            if (supplier == null) return NotFound();

            await _repository.CommitAsync();

            return supplier;
        }

        [HttpDelete("delete-all")]
        public async Task<bool> DeleteSuppliers([FromHeader] string[] ids) {
            var query = await _repository.DeleteSuppliersAsync(ids);

            if (query) {
                await _repository.CommitAsync();
            }

            return query;
        }
#endregion
#endregion

#region SupplierProduct

#region Get Values

        [HttpGet("{supplierId}/products/select")]
        public async Task<ActionResult<IEnumerable<ProductSelectDto>>> GetProductsBySupplierForSelect(int supplierId) {
            var products = await _repository.GetProductsBySupplierAsync(supplierId);

            return Ok(products);
        }

        [HttpGet("{supplierId}/paged-products")]
        public async Task<ActionResult<Paged<ProductsBySupplierDto>>> GetPagedProductsBySupplier(
            [FromQuery] int supplierId, [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter) {
            var query = await _repository.GetPagedProductsBySupplierAsync(
                pagingParams, sortParams, filter, p => p.PersonId == supplierId);

            return new Paged<ProductsBySupplierDto>(query);
        }

        [HttpGet("{supplierId}/products-not-added")]
        public JsonResult GetProductsNotBySupplier(int supplierId) {
            var products = _repository.GetProductsNotBySupplier(supplierId);
            return products;
        }
#endregion

#region Actions
        [HttpPost("product")]
        public async Task AddSupplierProduct(PersonProduct model) {
            await _repository.AddSupplierProductAsync(model);

            await _repository.CommitAsync();

        }

        [HttpDelete("product")]
        public async Task<ActionResult<PersonProductDto>> DeleteSupplierProduct(PersonProduct model) {
            var entity = await _repository.DeleteSupplierProductAsync(model);

            if (entity == null) return NotFound();

            await _repository.CommitAsync();

            return entity;
        }

#endregion

#endregion

    }
}
