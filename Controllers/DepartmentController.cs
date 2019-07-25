using System.Collections.Generic;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Shine.Controllers.Interfaces;
using Shine.Data.Dto.Departments;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DepartmentController : ControllerBase, IDepartmentController
    {

        #region Private Fields
        private readonly IDepartmentRepository _repository;
        #endregion

        #region Constructor
        public DepartmentController(IDepartmentRepository repository)
        {
            this._repository = repository;
        }
        #endregion

        #region Get Values



        [HttpGet("select")]
        public async Task<ActionResult<IEnumerable<DepartmentSelectDto>>> GetDepartmentsSelect()
        {
            var query = await _repository.GetDepartmentsSelectAsync();

            return Ok(query);
        }

        [HttpGet("departmentId")]
        public async Task<ActionResult<DepartmentDto>> GetDepartment(int departmentId)
        {
            var query = await _repository.GetDepartmentAsync(departmentId);

            return query;
        }


        #endregion

        #region Actions
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<DepartmentDto>> AddDepartment([FromBody] Department department)
        {
            await _repository.AddDepartmentAsync(department);
            await _repository.CommitAsync();

            return CreatedAtAction(nameof(GetDepartment), new { departmentId = department.DepartmentId }, department.Adapt<DepartmentDto>());
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<DepartmentDto>> UpdateDepartment([FromBody] Department department)
        {
            var query = await _repository.UpdateDepartmentAsync(department);

            if (query == null) return NotFound();

            await _repository.CommitAsync();

            return query.Adapt<DepartmentDto>();
        }

        [HttpDelete("{departmentId}")]
        public async Task<ActionResult<DepartmentDto>> DeleteDepartment(int departmentId)
        {
            var country = await _repository.DeleteDepartmentAsync(departmentId);

            if (country == null) return NotFound();

            await _repository.CommitAsync();

            return country.Adapt<DepartmentDto>();
        }

        #endregion

    }
}
