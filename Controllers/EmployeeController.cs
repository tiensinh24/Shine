using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Shine.Controllers.Interfaces;
using Shine.Data;
using Shine.Data.Dto.Employees;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Controllers {

    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeController : ControllerBase, IEmployeeController {

#region Private Fields

        private readonly IEmployeeRepository _repository;
        private readonly AppDbContext _context;

#endregion

#region Constructor

        public EmployeeController(IEmployeeRepository repository, AppDbContext context) {
            this._context = context;
            this._repository = repository;
        }

#endregion

#region Employees

#region Get Values

        [HttpGet("select")]
        public async Task<ActionResult<IEnumerable<EmployeeSelectDto>>> GetEmployeesSelect() {
            var query = await _repository.GetEmployeesSelectAsync();

            return Ok(query);
        }

        [HttpGet("{employeeId}")]
        public async Task<ActionResult<EmployeeListDto>> GetEmployee(int employeeId) 
        {
            var employee = await _repository.GetEmployeeAsync(employeeId);

            return employee;
        }

#endregion

#region Actions        

        [HttpPost]
        public async Task<ActionResult<Employee>> AddEmployee([FromBody] Employee employee) {

            var query = await _repository.AddEmployeeAsync(employee);

            if (query != null) {
                await _repository.CommitAsync();
            }

            return query;
        }

        [HttpPut]
        public async Task<ActionResult<EmployeeDto>> UpdateEmployee([FromBody] Employee employee) {
            var query = await _repository.UpdateEmployeeAsync(employee);

            if (query == null) return NotFound();

            await _repository.CommitAsync();

            return query;
        }

        [HttpDelete("employeeId")]
        public async Task<ActionResult<EmployeeDto>> DeleteEmployee(int employeeId) {
            var employee = await _repository.DeleteEmployeeAsync(employeeId);

            if (employee == null) return NotFound();

            await _repository.CommitAsync();

            return employee;
        }

#endregion

#endregion
    }
}
