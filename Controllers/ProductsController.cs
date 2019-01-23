using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Shine.Data.Models;

namespace Shine.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return new Product[]
            {
                new Product (1, "Bow", (decimal)10.05),
                new Product (2, "Chair", (decimal)8.50),
                new Product (3, "Table", (decimal)20.15)
            };
        }
    }
}