using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using Shine.Data.Dto.Employees;
using Shine.Data.Models;

namespace Shine.Controllers.Interfaces {
    public interface IEmployeeController {
#region Employees

#region Get Values

        Task<ActionResult<IEnumerable<EmployeeSelectDto>>> GetEmployeesSelect();

        Task<ActionResult<EmployeeListDto>> GetEmployee(int employeeId);

#endregion

#region Actions

        Task<ActionResult<Employee>> AddEmployee([FromBody] Employee employee);

        Task<ActionResult<EmployeeDto>> UpdateEmployee([FromBody] Employee employee);

        Task<ActionResult<EmployeeDto>> DeleteEmployee(int employeeId);

#endregion

#endregion
    }
}
