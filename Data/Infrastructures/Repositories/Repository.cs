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

        public IEnumerable<T> GetByCondition(Expression<Func<T, bool>> condition)
        {
            return _repository.Where(condition);
        }

        public IEnumerable<T> GetAll()
        {
            return _repository;
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
        public async Task<IEnumerable<T>> GetAllAsync()
        {            
            return await _repository.ToListAsync();
        }

        public async Task<T> GetByIdAsync(Expression<Func<T, bool>> condition)
        {
            return await _repository.Where(condition).FirstOrDefaultAsync();
        }
        public async Task CommitAsync()
        {
            await _context.SaveChangesAsync();
        }
        #endregion
    }
}