using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Shine.Data.Dto._Paging;
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

        public async Task<PagedList<EmployeeListDto>> GetPagedEmployeeAsync(PagingParams pagingParams, SortParams sortParams, string filter)
        {
            var source = _repository
                .AsNoTracking()
                .ProjectToType<EmployeeListDto>();

            switch (sortParams.SortOrder)
            {
                case "asc":
                    switch (sortParams.SortColumn)
                    {
                        case "fullName":
                            source = source.OrderBy(e => e.FullName);
                            break;
                        case "dateOfBirth":
                            source = source.OrderBy(e => e.DateOfBirth);
                            break;
                        case "countryName":
                            source = source.OrderBy(e => e.CountryName);
                            break;
                        
                    }
                    break;

                case "desc":
                    switch (sortParams.SortColumn)
                    {
                        case "fullName":
                            source = source.OrderByDescending(e => e.FullName);
                            break;
                        case "dateOfBirth":
                            source = source.OrderByDescending(e => e.DateOfBirth);
                            break;
                        case "countryName":
                            source = source.OrderByDescending(e => e.CountryName);
                            break;
                        
                    }
                    break;

                default:
                    source = source.OrderBy(e => e.FullName);
                    break;
            }

            if (!string.IsNullOrEmpty(filter))
            {
                source = source.Where(s => s.FullName.ToLower().Contains(filter.ToLower()));
            }

            return await PagedList<EmployeeListDto>.CreateAsync(source, pagingParams.PageIndex, pagingParams.PageSize);


        }

        public async Task<EmployeeListDto> GetEmployeeAsync(int employeeId)
        {
            var employee = await _repository
                .AsNoTracking()
                .ProjectToType<EmployeeListDto>()
                .FirstOrDefaultAsync(e => e.EmployeeId == employeeId);

            return employee;
        }

        public async Task<EmployeeDetailDto> GetEmployeeDetailAsync(int employeeId)
        {
            var employee = await _repository
                .AsNoTracking()
                .ProjectToType<EmployeeDetailDto>()
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

        public async Task<bool> DeleteEmployeesAsync(string[] ids)
        {
            var employees = await _context.Set<Employee>()
                .Where(s => ids.Contains(s.EmployeeId.ToString()))
                .ToListAsync();

            if (employees != null)
            {
                _context.Set<Employee>().RemoveRange(employees);

                return true;
            }
            return false;
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
                query.Email = employee.Email;
                query.Address = employee.Address;
                query.CountryId = employee.CountryId;
                query.DepartmentId = employee.DepartmentId;
            }

            return query.Adapt<EmployeeDto>();
        }



        #endregion

        #endregion

    }
}
