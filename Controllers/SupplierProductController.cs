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

        // [HttpGet]
        // public ActionResult<IEnumerable<SupplierProductDto>> GetSupplierProductsDto()
        // {
        //     return _repository.GetSupplierProductsDto().ToList();
        // }

        [HttpGet]
        public IActionResult GetProductsGroupBySupplier()
        {
            var query = _context.PersonProducts
                .Include(p => p.Person).Include(p => p.Product)
                .Where(p => p.Product.ProductType == true &&
                    p.Person.PersonType == PersonType.Supplier)
                .ProjectToType<SupplierProductDto>().AsNoTracking();

            var result = from b in query
            group new { b.ProductName, b.Specification } by new { b.PersonId, b.FullName } into g
            select new
            {
            Supplier = g.Key,
            Products = g
            };

            return Ok(result);

        }
    }
}
