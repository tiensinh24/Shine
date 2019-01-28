using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shine.Data.Infrastructures.Interfaces;

namespace Shine.Data.Infrastructures.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private AppDbContext _context;
        private DbSet<T> _repository;
        public Repository(AppDbContext context)
        {
            this._context = context;
            this._repository = _context.Set<T>();
        }

        #region Sync
        public void Add(T entity)
        {
            _repository.Add(entity);
        }

        public void Delete(Expression<Func<T, bool>> condition)
        {
            var entity = _repository.Where(condition).FirstOrDefault();
            _repository.Remove(entity);
        }

        public IEnumerable<T> GetByCondition(Expression<Func<T, bool>> condition, params Expression<Func<T, object>>[] includes)
        {
            var query = _repository.AsNoTracking();
            if (includes != null)
                if (includes.Length > 0)
                    foreach (var include in includes)
                        query = query.Include(include);
            return query.Where(condition);
        }

        public IEnumerable<T> GetAll(params Expression<Func<T, object>>[] includes)
        {
            var query = _repository.AsNoTracking();
            if (includes != null)
                if (includes.Length > 0)
                    foreach (var include in includes)
                        query = query.Include(include);
            return query;
        }

        public void Update(T entity)
        {
            _repository.Update(entity);
        }

        public void Commit()
        {
            _context.SaveChanges();
        }
        #endregion       
        
        #region Async
        public async Task<IEnumerable<T>> GetAllAsync(params Expression<Func<T, object>>[] includes)
        {
            var query = _repository.AsNoTracking().AsQueryable();
            if (includes != null)
                if (includes.Length > 0)
                    foreach (var include in includes)
                        query = query.Include(include);
            return await query.ToListAsync();
        }

        public async Task<T> GetByIdAsync(Expression<Func<T, bool>> condition,
            params Expression<Func<T, object>>[] includes)
        {
            var query = _repository.AsNoTracking();
            if (includes != null)
                if (includes.Length > 0)
                    foreach (var include in includes)
                        query = query.Include(include);
            return await query.Where(condition).FirstOrDefaultAsync();            
        }
        public async Task CommitAsync()
        {
            await _context.SaveChangesAsync();
        }
        #endregion
    }
}