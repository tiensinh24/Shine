using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Shine.Data.Infrastructures.Interfaces;

namespace Shine.Data.Infrastructures.Repositories
{
    public class CrudRepository<T> : ICrudRepository<T> where T : class
    {
        private AppDbContext _context;
        private DbSet<T> _repository;
        public CrudRepository(AppDbContext context)
        {
            this._context = context;
            this._repository = _context.Set<T>();
        }

        public void Add(T entity)
        {
            throw new System.NotImplementedException();
        }

        public void Delete(T entity)
        {
            _repository.Remove(entity);
        }

        public IEnumerable<T> Get(Expression<Func<T, bool>> expression)
        {
            return _repository.Where(expression);
        }

        public IEnumerable<T> GetAll()
        {
            return _repository;
        }

        public void Update(T entity)
        {
            _repository.Update(entity);
        }
    }
}