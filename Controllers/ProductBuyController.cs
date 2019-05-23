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
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Controllers {
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductBuyController : ControllerBase, IProductBuyController {
#region Private Field
        private readonly IProductBuyRepository _repository;
#endregion        

#region Constructor
        public ProductBuyController(IProductBuyRepository repository) {

            this._repository = repository;
        }
#endregion

#region Get Values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductBuyListDto>>> GetProducts() {
            var query = await _repository.GetProductsAsync(p => p.ProductId, "asc");

            return Ok(query);
        }

        [HttpGet("paged")]
        public async Task<ActionResult<Paged<ProductBuyListDto>>> GetPagedProducts(
            [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter) {
            var query = await _repository.GetPagedProductsAsync(pagingParams, sortParams, filter, null);

            return new Paged<ProductBuyListDto>(query);
        }

        [HttpGet("{productId}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductBuyDetailDto>> GetProduct(int productId) {
            var product = await _repository.GetProductAsync(productId);

            if (product == null) {
                return NotFound();
            }

            return product;
        }
#endregion

#region Actions
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ProductBuyDto>> AddProduct([FromBody] ProductBuy productBuy) {
            await _repository.AddProductAsync(productBuy);
            await _repository.CommitAsync();

            return CreatedAtAction(nameof(GetProduct),
                new { productId = productBuy.ProductId },
                productBuy.Adapt<ProductBuyDto>());
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ProductBuyDto>> UpdateProduct([FromBody] ProductBuy productBuy) {
            var product = await _repository.UpdateProductAsync(productBuy);

            if (product == null) return NotFound();

            await _repository.CommitAsync();

            return product;
        }

        [HttpDelete("{productId}")]
        public async Task<ActionResult<ProductBuyDto>> DeleteProduct(int productId) {
            var product = await _repository.DeleteProductAsync(productId);

            if (product == null) return NotFound();

            await _repository.CommitAsync();

            return product;
        }

        [HttpDelete("delete-all")]
        public async Task<bool> DeleteProducts([FromHeader] string[] ids) {
            var query = await _repository.DeleteProductsAsync(ids);

            if (query) {
                await _repository.CommitAsync();
            }

            return query;
        }

#endregion

    }
}
