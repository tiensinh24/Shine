using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Newtonsoft.Json;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Departments;
using Shine.Data.Dto.Products;
using Shine.Data.Dto.Products.Buy;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories
{
    public class DepartmentRepository : Repository, IDepartmentRepository
    {
        #region Private fields

        private readonly DbSet<Department> _repository;

        #endregion

        #region Constructor        
        public DepartmentRepository(AppDbContext context, RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager, IConfiguration configuration
        ) : base(context, roleManager, userManager, configuration)
        {
            this._repository = _context.Set<Department>();
        }
        #endregion

        #region Department

        #region Get Values
        public async Task<IEnumerable<DepartmentSelectDto>> GetDepartmentsSelectAsync()
        {
            var query = await _repository
                .AsNoTracking()
                .ProjectToType<DepartmentSelectDto>()
                .OrderBy(d => d.DepartmentName)
                .ToListAsync();


            return query;
        }


        public async Task<DepartmentDto> GetDepartmentAsync(int departmentId)
        {
            var query = await _repository
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.DepartmentId == departmentId);

            return query.Adapt<DepartmentDto>();
        }


        #endregion

        #region Actions
        public async Task<DepartmentDto> AddDepartmentAsync(Department department)
        {
            var query = await _repository.AddAsync(department);

            return query.Entity.Adapt<DepartmentDto>();
        }

        public async Task<DepartmentDto> UpdateDepartmentAsync(Department department)
        {
            var query = await _repository
                .FirstOrDefaultAsync(p => p.DepartmentId == department.DepartmentId);

            if (query != null)
            {
                query.DepartmentName = department.DepartmentName;
            }

            return query.Adapt<DepartmentDto>();
        }

        public async Task<DepartmentDto> DeleteDepartmentAsync(int departmentId)
        {
            var query = await _repository
                .FirstOrDefaultAsync(p => p.DepartmentId == departmentId);

            if (query != null)
            {
                _repository.Remove(query);
            }

            return query.Adapt<DepartmentDto>();
        }



        #endregion

        #endregion


    }
}
