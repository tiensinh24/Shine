using System;
using System.Collections.Generic;
using System.Linq;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shine.Data;
using Shine.Data.Dto.Products;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Controllers
{
    [Produces("application/json")]
    [Route("api/product-buy")]
    public class ProductBuyController : Controller
    {
        private readonly ProductBuyRepository _repository;        
        public ProductBuyController(ProductBuyRepository repository)
        {            
            this._repository = repository;
        }

    [HttpGet]
    public IEnumerable<ProductBuyListDto> GetProducts()
    {
        return _repository.GetProducts();
    }

    [HttpGet("{id}")]
    public ProductBuy GetProduct(int id)
    {
        return _repository.GetByCondition(p => p.ProductId == id).FirstOrDefault();
    }

    [HttpPost]
    public ProductBuy AddProduct([FromBody]ProductBuy productBuy)
    {
        _repository.Add(productBuy);
        _repository.Commit();       
        return productBuy;
    }

    [HttpPut]
    public ProductBuy UpdateProduct([FromBody]ProductBuy productBuy)
    {
        _repository.Update(productBuy);
        _repository.Commit();
        return productBuy;
    }

    [HttpDelete("{id}")]
    public bool DeleteProduct([FromRoute] int id)
    {
        try
        {
            _repository.Delete(p => p.ProductId == id);
            _repository.Commit();
            return true;
        }
        catch (System.Exception)
        {
            return false;
            throw;
        }
    }

}
}