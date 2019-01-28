using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Shine.Data;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly ProductRepository _repository;
        public ProductController(ProductRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public IEnumerable<Product> GetProducts()
        {
            return _repository.GetAll(p => p.Category);
        }

        [HttpGet("{id}")]
        public IEnumerable<Product> GetProduct(int id)
        {
            return _repository.GetByCondition(p => p.ProductId == id, p => p.Category);
        }

        [HttpPost]
        public Product AddProduct([FromBody]Product product)
        {  
            _repository.Add(product);
            _repository.Commit();
            return product;
        }
    }
}