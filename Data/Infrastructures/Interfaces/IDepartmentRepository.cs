using System.Collections.Generic;
using System.Threading.Tasks;
using Shine.Data.Dto.Departments;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface IDepartmentRepository : IRepository {
#region Get Values
        Task<IEnumerable<DepartmentSelectDto>> GetDepartmentsSelectAsync();
        Task<DepartmentDto> GetDepartmentAsync(int departmentId);
#endregion

#region Actions
        Task<DepartmentDto> AddDepartmentAsync(Department department);

        Task<DepartmentDto> UpdateDepartmentAsync(Department department);

        Task<DepartmentDto> DeleteDepartmentAsync(int departmentId);
        
#endregion

    }
}
