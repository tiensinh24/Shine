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
    public class ProductsController : Controller
    {        
        private readonly AppDbContext _context;
        public ProductsController(AppDbContext context)
        {
            this._context = context;    
        }
    [HttpGet]
    public IEnumerable<Product> GetProducts()
    {
        return _context.Products.ToList();
    }

    [HttpGet("{id}")]
    public Product GetProduct(int id)
    {
        return _context.Products.FirstOrDefault(p => p.ProductId == id);
    }
}
}