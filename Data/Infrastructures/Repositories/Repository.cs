using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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
        
        public void Add(T entity)
        {
            _repository.Add(entity);
        }

        public void Delete(T entity)
        {
            _repository.Remove(entity);
        }

        public IEnumerable<T> GetByCondition(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes)
        {
            var query = _repository.AsNoTracking();
            if (includes != null)
                if (includes.Length > 0)
                    foreach (var include in includes)
                        query = query.Include(include);
            return query.Where(expression);
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

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}