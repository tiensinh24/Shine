using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shine.Data;
using Shine.Data.Models;

namespace Shine.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class CustomersController : Controller
    {
        private readonly AppDbContext _context;

        public CustomersController(AppDbContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public IEnumerable<Customer> GetCustomers()
        {
            return _context.Peoples.OfType<Customer>();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomer([FromRoute] int id)
        {            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customer = await _context.Peoples.OfType<Customer>().SingleOrDefaultAsync(c => c.PeopleId == id);

            if (customer == null) return NotFound();

            return Ok(customer);
        }
    }
}