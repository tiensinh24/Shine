using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Shine.Data.Dto.Employees;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories
{
    public class EmployeeRepository : Repository, IEmployeeRepository
    {

        #region Private Fields

        private DbSet<Employee> _repository;

        #endregion

        #region Constructor

        public EmployeeRepository(AppDbContext context, RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager, IConfiguration configuration) : base(context, roleManager, userManager, configuration)
        {

            this._repository = context.Employees;
        }

        #endregion

        #region Employees

        #region Get Values

        public async Task<IEnumerable<EmployeeSelectDto>> GetEmployeesSelectAsync()
        {
            var employees = await _repository
                .ProjectToType<EmployeeSelectDto>()
                .OrderBy(e => e.FullName)
                .ToListAsync();

            return employees;
        }

        public async Task<EmployeeListDto> GetEmployeeAsync(int employeeId)
        {
            var employee = await _repository
                .AsNoTracking()
                .ProjectToType<EmployeeListDto>()
                .FirstOrDefaultAsync(e => e.EmployeeId == employeeId);

            return employee;
        }

        #endregion

        #region Actions

        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            await _repository.AddAsync(employee);
            return employee;
        }

        public async Task<EmployeeDto> DeleteEmployeeAsync(int employeeId)
        {
            var employee = await _repository
                .FirstOrDefaultAsync(e => e.EmployeeId == employeeId);

            if (employee != null)
            {
                _repository.Remove(employee);
            }

            return employee.Adapt<EmployeeDto>();
        }

        public async Task<EmployeeDto> UpdateEmployeeAsync(Employee employee)
        {
            var query = await _repository
                .FirstOrDefaultAsync(e => e.EmployeeId == employee.EmployeeId);

            if (query != null)
            {
                query.Gender = employee.Gender;
                query.FirstName = employee.FirstName;
                query.LastName = employee.LastName;
                query.DateOfBirth = employee.DateOfBirth;
                query.Telephone = employee.Telephone;
                query.CountryId = employee.CountryId;
                query.DepartmentId = employee.DepartmentId;
            }

            return query.Adapt<EmployeeDto>();
        }

        #endregion

        #endregion

    }
}
