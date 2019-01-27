// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using Shine.Data;
// using Shine.Data.Models;

// namespace Shine.Controllers
// {
//     [Produces("application/json")]
//     [Route("api/[controller]")]
//     public class CustomersController : Controller
//     {
//         private readonly AppDbContext _context;

//         public CustomersController(AppDbContext context)
//         {
//             this._context = context;
//         }

//         [HttpGet]
//         public IEnumerable<User> GetCustomers()
//         {
//             return _context.Users;
//         }

//         [HttpGet("{id}")]
//         public async Task<IActionResult> GetCustomer([FromRoute] int id)
//         {            
//             if (!ModelState.IsValid)
//             {
//                 return BadRequest(ModelState);
//             }

//             var customer = await _context.Users.SingleOrDefaultAsync(c => c.Id == id);

//             if (customer == null) return NotFound();

//             return Ok(customer);
//         }
//     }
// }