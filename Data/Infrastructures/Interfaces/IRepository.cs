using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll(params Expression<Func<T, object>>[] includes);
        IEnumerable<T> GetByCondition(Expression<Func<T, bool>> expression,
            Expression<Func<T, object>>[] includes);
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        void Save();
    }
}