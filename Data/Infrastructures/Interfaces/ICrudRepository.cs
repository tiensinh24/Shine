using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ICrudRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        IEnumerable<T> Get(Expression<Func<T, bool>> expression);
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}