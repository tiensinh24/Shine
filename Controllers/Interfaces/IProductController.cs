using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using Shine.Data.Dto.Products;

namespace Shine.Controllers.Interfaces {
    public interface IProductController {
        Task<ActionResult<IEnumerable<ProductSelectDto>>> GetProductsSelect();
    }
}
