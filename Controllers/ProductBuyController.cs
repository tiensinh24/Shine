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
using Shine.Data.Dto.Products.Buy;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductBuyController : ControllerBase
    {
        private readonly ProductBuyRepository _repository;
        public ProductBuyController(ProductBuyRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ProductBuyDto>> GetProducts()
        {
            return _repository.GetProducts().ToList();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<ProductBuyDto> GetProduct(int id)
        {
            var product = _repository.GetProduct(id);
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<ProductBuyDto> AddProduct([FromBody] ProductBuy productBuy)
        {
            _repository.Add(productBuy);
            _repository.Commit();
            var product = _repository.GetProduct(productBuy.ProductId);
            return product;
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<ProductBuyDto> UpdateProduct([FromBody] ProductBuy productBuy)
        {
            _repository.UpdateProduct(productBuy);
            _repository.Commit();
            var query = _repository.GetProduct(productBuy.ProductId);
            return query;
        }

        [HttpDelete("{id}")]
        public ActionResult<int> DeleteProduct(int id)
        {
            _repository.DeleteProduct(id);
            _repository.Commit();
            return id;
        }

    }
}
