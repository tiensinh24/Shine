using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shine.Data;
using Shine.Data.Models;

namespace Shine.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [Authorize]
    public class ValueController : Controller
    {
        private readonly AppDbContext _context;

        public ValueController(AppDbContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public IActionResult GetProductsGroupByCategory(int year)
        {
            var query = _context.Set<OrderBuy>()
                .AsNoTracking()
                .Where(o => o.DateOfIssue.Year == year)
                .GroupBy(o => new { o.PersonId, SupplierName = o.Person.FirstName + " " + o.Person.LastName })
                .Select(g => new
                {
                    SupplierId = g.Key.PersonId,
                    SupplierName = g.Key.SupplierName,
                    Jan = g.Where(o => o.DateOfIssue.Month == 1).Sum(o => o.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax))),
                    Feb = g.Where(o => o.DateOfIssue.Month == 2).Sum(o => o.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax))),
                    Mar = g.Where(o => o.DateOfIssue.Month == 3).Sum(o => o.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax))),
                    Apr = g.Where(o => o.DateOfIssue.Month == 4).Sum(o => o.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax))),
                    May = g.Where(o => o.DateOfIssue.Month == 5).Sum(o => o.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax))),
                    Jun = g.Where(o => o.DateOfIssue.Month == 6).Sum(o => o.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax))),
                    Jul = g.Where(o => o.DateOfIssue.Month == 7).Sum(o => o.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax))),
                    Aug = g.Where(o => o.DateOfIssue.Month == 8).Sum(o => o.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax))),
                    Sep = g.Where(o => o.DateOfIssue.Month == 9).Sum(o => o.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax))),
                    Oct = g.Where(o => o.DateOfIssue.Month == 10).Sum(o => o.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax))),
                    Nov = g.Where(o => o.DateOfIssue.Month == 11).Sum(o => o.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax))),
                    Dec = g.Where(o => o.DateOfIssue.Month == 12).Sum(o => o.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax)))

                });

            return Ok(query);

        }
    }
}
