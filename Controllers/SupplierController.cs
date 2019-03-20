using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Shine.Data;
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
    public class SupplierController : ControllerBase
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
        [HttpGet]
        public ActionResult<IEnumerable<SupplierDto>> GetProducts()
        {
            return _repository.GetSuppliers().ToList();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<SupplierDto> GetSupplier(int id)
        {
            var supplier = _repository.GetSupplier(id);
            if (supplier == null)
            {
                return NotFound();
            }
            return supplier;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<SupplierDto> AddSupplier([FromBody] Supplier supplier)
        {            
            _repository.Add(supplier);
            _repository.Commit();
            var supReturn = _repository.GetSupplier(supplier.PersonId);
            return supReturn;
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<SupplierDto> UpdateSupplier([FromBody] Supplier supplier)
        {
            _repository.UpdateSupplier(supplier);
            _repository.Commit();
            var supReturn = _repository.GetSupplier(supplier.PersonId);
            return supReturn;
        }

        [HttpDelete("{id}")]
        public ActionResult<int> DeleteSupplier(int id)
        {
            _repository.DeleteSupplier(id);
            _repository.Commit();
            return id;
        }
#endregion

#region SupplierProduct
        [HttpGet]
        [Route("products")]
        public ActionResult<IEnumerable<SupplierProductDto>> GetSupplierProductsDto()
        {
            return _repository.GetSupplierProductsDto().ToList();
        }

        [HttpGet("{supplierId}/products-group")]
        public ActionResult<ProductsGroupBySupplierDto> GetProductsGroupBySupplier(int supplierId)
        {
            var products = _repository.GetProductsGroupBySupplier(supplierId);
            return products;
        }

        [HttpGet("{supplierId}/products")]
        public ActionResult<IEnumerable<ProductsBySupplierDto>> GetProductsBySupplier(int supplierId)
        {
            var products = _repository.GetProductsBySupplier(supplierId).ToList();
            return products;
        }

        [HttpGet("{supplierId}/products-not-added")]
        public IActionResult GetProductsNotBySupplier(int supplierId)
        {
            var products = _repository.GetProductsNotBySupplier(supplierId);
            return products;
        }

        [HttpPost("product")]
        public ActionResult<PersonProduct> AddSupplierProduct(PersonProduct supplierProduct)
        {
            _repository.Add(supplierProduct);
            _repository.Commit();
            return supplierProduct;
        }

        [HttpDelete("product")]
        public ActionResult<PersonProduct> DeleteSupplierProduct(PersonProduct supplierProduct)
        {
            _repository.DeleteSupplierProduct(supplierProduct);
            _repository.Commit();
            return supplierProduct;
        }
#endregion

    }
}
