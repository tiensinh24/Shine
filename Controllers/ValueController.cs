using System.Drawing;
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
      var source = _context.Set<Supplier>()
          .AsNoTracking()
          .GroupBy(s => new
          {
            s.PersonId,
            SupplierName = s.FirstName + " " + s.LastName,
            MainPhotoUrl = s.Photos.FirstOrDefault(p => p.IsMain == true).PhotoUrl
          },
              (key, element) => new SupplierDebtDto
              {
                SupplierId = key.PersonId,
                SupplierName = key.SupplierName,
                MainPhotoUrl = key.MainPhotoUrl,
                Debt = element.Sum(e => e.Orders.Sum(o => o.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax))
                          - (o.Payments.Count() == 0 ? 0 : o.Payments.Sum(p => p.Amount))))
              })
          .Where(o => o.Debt > 0)
          .OrderByDescending(o => o.Debt)
          .Take(numRows);

      return source;
    }
  }
}
