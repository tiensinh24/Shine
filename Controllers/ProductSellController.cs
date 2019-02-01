using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Shine.Data.Dto.Products;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Controllers
{
    [Produces("application/json")]
    [Route("product-sell")]
    public class ProductSellController : Controller
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
            return _repository.GetByCondition(p => p.ProductId == id).FirstOrDefault();
        }

        [HttpPost]
        public void AddProduct([FromBody] ProductSell productSell)
        {
            _repository.Add(productSell);
            _repository.Commit();
        }
    
    }
}