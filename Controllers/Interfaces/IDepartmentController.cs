using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Shine.Data.Dto.Departments;
using Shine.Data.Models;

namespace Shine.Controllers.Interfaces
{
    public interface IDepartmentController
    {
#region Get Values
        Task<ActionResult<IEnumerable<DepartmentSelectDto>>> GetDepartmentsSelect();

#endregion

#region Actions
        Task<ActionResult<DepartmentDto>> AddDepartment([FromBody] Department department);

        Task<ActionResult<DepartmentDto>> UpdateDepartment([FromBody] Department department);

        Task<ActionResult<DepartmentDto>> DeleteDepartment(int departmentId);
#endregion
    }
}
