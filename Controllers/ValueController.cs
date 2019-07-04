using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public async Task<IEnumerable<OrderAndCostPerQuarterDto>> GetOrderAndCostPerQuarterAsync(int year)
    {
      var query = await _context.Set<OrderBuy>()
        .AsNoTracking()
        .Where(o => o.DateOfIssue.Year == year)
        .Select(o => new
        {
          Quarter = Data.Helpers.Helpers.GetQuarter(o.DateOfIssue.Month),
          Value = o.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax)),
          Cost = o.Costs.Sum(c => c.Amount)
        })
        .GroupBy(g => g.Quarter)
        .Select(g => new OrderAndCostPerQuarterDto
        {
          Quarter = g.Key,
          Amount = g.Sum(i => i.Value),
          Cost = g.Sum(i => i.Cost)
        })
        .OrderBy(g => g.Quarter)
        .ToListAsync();

      return query;
    }
  }
}

