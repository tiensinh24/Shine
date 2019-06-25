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
    public decimal OrdersSumAsync(int year, int? month)
    {
      decimal query;

      if (month > 0)
      {
        query = _context.Costs
        .AsNoTracking()
        .Where(c => c.Order.OrderType == true && c.Order.DateOfIssue.Year == year && c.Order.DateOfIssue.Month == month)
        .Sum(c => c.Amount);
      }
      else
      {
        query = _context.Costs
        .AsNoTracking()
        .Where(c => c.Order.OrderType == true && c.Order.DateOfIssue.Year == year)
        .Sum(c => c.Amount);
      }

      return query;
    }
  }
}
