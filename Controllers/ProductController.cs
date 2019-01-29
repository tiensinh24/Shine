using System;
using System.Collections.Generic;
using System.Linq;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shine.Data;
using Shine.Data.Dto;
using Shine.Data.Infrastructures.Interfaces;
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
    public IEnumerable<ProductsDto> GetProducts()
    {
        return _repository.GetProducts();
    }

    [HttpGet("{id}")]
    public Product GetProduct(int id)
    {
        return _repository.GetByCondition(p => p.ProductId == id).FirstOrDefault();
    }

    [HttpPost("buy")]
    public ProductBuy AddProductBuy([FromBody]ProductBuy productBuy)
    {
        _repository.Add(productBuy);
        _repository.Commit();
        return productBuy;
    }

    [HttpPost("sell")]
    public ProductSell AddProductSell([FromBody]ProductSell productSell)
    {
        _repository.Add(productSell);
        _repository.Commit();
        return productSell;
    }
}
}