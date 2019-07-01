using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shine.Data;
using Shine.Data.Dto.Orders;
using Shine.Data.Dto.Suppliers.Reports;
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
    public IEnumerable<SupplierDebtDto> OrdersSumAsync(int numRows)
    {
      var query = _context.Set<OrderBuy>()
        .AsNoTracking()
        .GroupBy(o => new
        {
          o.PersonId,
          SupplierName = o.Person.FirstName + " " + o.Person.LastName,
          MainPhotoUrl = o.Person.Photos.FirstOrDefault(p => p.IsMain == true).PhotoUrl
        },
        o => new
        {
          Debt = o.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax))
            - (o.Payments.Any() ? o.Payments.Sum(p => p.Amount) : 0)
        },
        (k, e) => new SupplierDebtDto
        {
          SupplierId = k.PersonId,
          SupplierName = k.SupplierName,
          MainPhotoUrl = k.MainPhotoUrl,
          Debt = e.Sum(d => d.Debt)
        })
        .OrderByDescending(g => g.Debt)
        .Take(numRows);

      return query;
    }
  }
}
