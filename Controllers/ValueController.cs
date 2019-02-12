using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Shine.Data;
using Shine.Data.Models;

namespace Shine.Controllers
{
    [Route ("api/[controller]")]
    public class ValueController : Controller
    {
        private readonly AppDbContext _context;

        public ValueController (AppDbContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public IActionResult GetProductsGroupByCategory ()
        {
            var grouped = from b in _context.Set<ProductBuy> ()
            group new { b.ProductId, b.Name } by b.Category.CategoryName into g
            select new
            {
            Category = g.Key,
            Products = g
            };
            var result = grouped.ToList ();

            return Ok (result);
        }
    }
}
