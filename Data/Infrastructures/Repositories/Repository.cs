using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Shine.Data.Infrastructures.Interfaces;

namespace Shine.Data.Infrastructures.Repositories
{
    public class Repository : Controller, IRepository
    {
#region Shared Field
        protected readonly AppDbContext _context;
        protected readonly RoleManager<IdentityRole> _roleManager;
        protected readonly UserManager<IdentityUser> _userManager;
        protected readonly IConfiguration _configuration;
        protected readonly JsonSerializerSettings _jsonSettings;
#endregion

#region Constructor
        public Repository(AppDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager,
            IConfiguration configuration)
        {
            this._context = context;
            this._roleManager = roleManager;
            this._userManager = userManager;
            this._configuration = configuration;

            this._jsonSettings = new JsonSerializerSettings()
            {
                Formatting = Formatting.Indented
            };
        }
#endregion

#region Sync
        public IEnumerable<T> GetAll<T>() where T : class
        {
            return _context.Set<T>();
        }

        public T GetById<T>(Expression<Func<T, bool>> condition) where T : class
        {
            return _context.Set<T>().Where(condition).FirstOrDefault();
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Set<T>().Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Set<T>().Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Set<T>().Remove(entity);
        }

        public void Commit()
        {
            _context.SaveChanges();
        }
#endregion

#region Async
        public async Task<IEnumerable<T>> GetAllAsync<T>() where T : class
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<T> GetByIdAsync<T>(Expression<Func<T, bool>> condition) where T : class
        {
            return await _context.Set<T>().Where(condition).FirstOrDefaultAsync();
        }

        public async Task AddAsync<T>(T entity) where T : class
        {
            await _context.Set<T>().AddAsync(entity);
        }

        public async Task CommitAsync()
        {
            await _context.SaveChangesAsync();
        }
#endregion

    }
}
