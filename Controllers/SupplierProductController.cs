using System.Collections.Generic;
using System.Linq;

using Mapster;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Shine.Data;
using Shine.Data.Dto.Products;
using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SupplierProductController : ControllerBase
    {
        private readonly SupplierProductRepository _repository;
        private readonly AppDbContext _context;
        public SupplierProductController(SupplierProductRepository repository,
            AppDbContext context)
        {
            this._context = context;
            this._repository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<SupplierProductDto>> GetSupplierProductsDto()
        {
            return _repository.GetSupplierProductsDto().ToList();
        }

        // [HttpGet("{supplierId}")]
        // public ActionResult<ProductsGroupBySupplierDto> GetProductsGroupBySupplier(int supplierId)
        // {
        //     var result = _repository.GetProductsGroupBySupplier(supplierId);
        //     return result;

        // }

        [HttpDelete]
        public ActionResult<PersonProduct> DeleteSupplierProduct(PersonProduct supplierProduct)
        {
            _repository.DeleteSupplierProduct(supplierProduct);
            _repository.Commit();
            return supplierProduct;
        }

        [HttpGet("{supplierId}")]
        public ActionResult<ProductsGroupBySupplierDto> GetProductsGroupBySupplier(int supplierId)
        {
            return _repository.GetProductsGroupBySupplier(supplierId);
        }

        [HttpGet("not/{supplierId}")]
        public IActionResult GetProductsNotBySupplier(int supplierId)
        {
            var query = _repository.GetProductsNotBySupplier(supplierId);
            return query;
        }
    }
}
