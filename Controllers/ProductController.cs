using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Shine.Controllers.Interfaces;
using Shine.Data.Dto.Products;
using Shine.Data.Infrastructures.Interfaces;

namespace Shine.Controllers {
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductController : ControllerBase, IProductController {
        private readonly IProductRepository _repository;
        public ProductController(IProductRepository repository) {
            this._repository = repository;
        }

        [HttpGet("select")]
        public async Task<ActionResult<IEnumerable<ProductSelectDto>>> GetProductsSelect() {
            var products = await _repository.GetProductsSelectAsync();

            return Ok(products);
        }
    }
}
