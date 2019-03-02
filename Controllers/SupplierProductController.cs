using System.Collections.Generic;
using System.Linq;

using Mapster;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Shine.Data;
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

        [HttpGet("{supplierId}")]
        public ActionResult<ProductsGroupBySupplierDto> GetProductsGroupBySupplier(int supplierId)
        {
            var result = _repository.GetProductsGroupBySupplier(supplierId);
            return result;

        }

        [HttpDelete("{personId}/{productId}")]
        public void DeleteSupplierProduct(int personId, int productId)
        {
            _repository.DeleteSupplierProduct(personId, productId);
        }

        [HttpGet("g/{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_repository.GetProductsBySupplier(id).ToList());
        }
    }
}
