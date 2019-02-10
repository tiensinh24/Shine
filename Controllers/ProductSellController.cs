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
    [Route("product-sell")]
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
        public ProductSell AddProduct([FromBody] ProductSell productSell)
        {
            _repository.Add(productSell);
            _repository.Commit();
            return productSell;
        }

        [HttpPut]
        public ProductSell UpdateProduct([FromBody] ProductSell productSell)
        {
            _repository.Update(productSell);
            _repository.Commit();
            return productSell;
        }

        [HttpDelete]
        public bool Deleteproduct([FromBody] ProductSell productSell)
        {
            try
            {
                _repository.Delete<ProductSell>(productSell);
                _repository.Commit();
                return true;
            }
            catch (System.Exception)
            {
                return false;
            }
        }
    
    }
}