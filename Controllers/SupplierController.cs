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
using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Dto.Suppliers;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SupplierController : ControllerBase, ISupplierController
    {
#region Private Fields
        private readonly ISupplierRepository _repository;
#endregion

#region Constructor
        public SupplierController(ISupplierRepository repository)
        {
            this._repository = repository;
        }
#endregion

#region Supplier
#region Get Values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SupplierListDto>>> GetSuppliers()
        {
            var query = await _repository.GetSuppliersAsync(s => s.FullName, "asc");

            return Ok(query);
        }

        public async Task<ActionResult<Paged<SupplierListDto>>> GetPagedSuppliers(
            [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter)
        {
            var query = await _repository.GetPagedSuppliersAsync(pagingParams, sortParams, filter);

            return new Paged<SupplierListDto>(query);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<SupplierListDto>> GetSupplier(int id)
        {
            var supplier = await _repository.GetSupplierAsync(id);

            if (supplier == null)
            {
                return NotFound();
            }

            return supplier;
        }
#endregion

#region Actions
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<SupplierDto>> AddSupplier([FromBody] Supplier supplier)
        {
            await _repository.AddSupplierAsync(supplier);
            await _repository.CommitAsync();

            return CreatedAtAction(nameof(GetSupplier),
                new { id = supplier.PersonId },
                supplier.Adapt<SupplierDto>());
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<SupplierDto>> UpdateSupplier([FromBody] Supplier supplier)
        {
            await _repository.UpdateSupplierAsync(supplier);
            await _repository.CommitAsync();

            return CreatedAtAction(nameof(GetSupplier),
                new { id = supplier.PersonId },
                supplier.Adapt<SupplierDto>());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<SupplierDto>> DeleteSupplier(int id)
        {
            var supplier = await _repository.DeleteSupplierAsync(id);

            if (supplier == null) return NotFound();

            await _repository.CommitAsync();

            return supplier;
        }
#endregion
#endregion

#region SupplierProduct
#region Get Values
        [HttpGet]
        [Route("products")]
        public async Task<ActionResult<IEnumerable<SupplierProductListDto>>> GetSupplierProductsDto()
        {
            var query = await _repository.GetSupplierProductsDto();

            return Ok(query);
        }

        [HttpGet("{supplierId}/products-group")]
        public async Task<ActionResult<ProductsGroupBySupplierDto>> GetProductsGroupBySupplier(int supplierId)
        {
            var entity = await _repository.GetProductsGroupBySupplierAsync(supplierId);

            if (entity == null) return NotFound();

            return entity;
        }

        [HttpGet("{supplierId}/products")]
        public ActionResult<IEnumerable<ProductsBySupplierDto>> GetProductsBySupplier(int supplierId)
        {
            var products = _repository.GetProductsBySupplierAsync(supplierId).ToList();
            return products;
        }

        [HttpGet("{supplierId}/products-not-added")]
        public IActionResult GetProductsNotBySupplier(int supplierId)
        {
            var products = _repository.GetProductsNotBySupplier(supplierId);
            return products;
        }
#endregion

#region Actions
        [HttpPost("product")]
        public async Task AddSupplierProduct(PersonProduct model)
        {
            await _repository.AddSupplierProductAsync(model);

            await _repository.CommitAsync();

        }

        [HttpDelete("product")]
        public async Task<ActionResult<PersonProductDto>> DeleteSupplierProduct(PersonProduct model)
        {
            var entity = await _repository.DeleteSupplierProductAsync(model);

            if (entity == null) return NotFound();

            await _repository.CommitAsync();

            return entity;
        }
#endregion

#endregion

    }
}
