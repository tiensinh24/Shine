using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shine.Data.Dto.Products;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [Authorize]
    public class ProductSellController
    {
        private readonly ProductSellRepository _repository;
        public ProductSellController(ProductSellRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public IEnumerable<ProductSellListDto> GetProducts()
        {
            return this._repository.GetProducts();
        }

        [HttpGet("{id}")]
        public ProductSell GetProduct(int id)
        {
            return _repository.GetById<ProductSell>(p => p.ProductId == id);
        }

        [HttpPost]
        public void AddProduct([FromBody] ProductSell productSell)
        {
            _repository.Add(productSell);
            _repository.Commit();
        }

        [HttpPut]
        public void UpdateProduct([FromBody]ProductSell productSell)
        {
            _repository.UpdateProduct(productSell);
            _repository.Commit();
        }

        [HttpDelete("{id}")]
        public void DeleteProduct(int id)
        {
            _repository.DeleteProduct(id);
            _repository.Commit();
        }
    
    }
}