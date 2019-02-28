using System.Collections.Generic;
using System.Linq;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Infrastructures.Repositories;

namespace Shine.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SupplierProductController : ControllerBase
    {
        private readonly SupplierProductRepository _repository;
        public SupplierProductController(SupplierProductRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<SupplierProductDto>> GetSupplierProductsDto()
        {
            return _repository.GetSupplierProductsDto().ToList();
        }
    }
}
