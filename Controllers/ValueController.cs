using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shine.Data;
using Shine.Data.Dto.Orders;
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
    public object OrdersSumAsync(int year)
    {
      var query = _context.Set<OrderBuy>()
        .AsNoTracking()
        .Where(o => o.DateOfIssue.Year == year && o.OrderType == true)
        .GroupBy(o => o.DateOfIssue.Month)
        .Select(g => new OrderAndCostPerMonthDto
        {
          Month = g.Key,
          Amount = g.Sum(o => o.ProductOrders.Sum(po => po.Quantity* po.Price * (1 + po.Tax))),
          Cost = g.Sum(o => o.Costs.Sum(c => c.Amount))
        });

      return query;
    }
  }
}
