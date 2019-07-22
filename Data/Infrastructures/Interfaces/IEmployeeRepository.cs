using System.Collections.Generic;
using System.Threading.Tasks;
using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Employees;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces {
    public interface IEmployeeRepository : IRepository {
#region Employees

#region Get Values

        Task<IEnumerable<EmployeeSelectDto>> GetEmployeesSelectAsync();

        Task<PagedList<EmployeeListDto>> GetPagedEmployeeAsync(PagingParams pagingParams, SortParams sortParams, string filter);

        Task<EmployeeListDto> GetEmployeeAsync(int employeeId);

        Task<EmployeeDetailDto> GetEmployeeDetailAsync(int employeeId);

#endregion

#region Actions

        Task<Employee> AddEmployeeAsync(Employee employee);

        Task<EmployeeDto> UpdateEmployeeAsync(Employee employee);

        Task<EmployeeDto> DeleteEmployeeAsync(int employeeId);

        Task<bool> DeleteEmployeesAsync(string[] ids);

#endregion

#endregion
    }
}
