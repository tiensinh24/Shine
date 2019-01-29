using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface IRepository<T> where T : class
    {
        #region Sync
        IEnumerable<T> GetAll();
        IEnumerable<T> GetByCondition(Expression<Func<T, bool>> condition);
        void Add(T entity);
        void Update(T entity);
        void Delete(Expression<Func<T, bool>> condition);
        void Commit();
        #endregion        

        #region Async
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(Expression<Func<T, bool>> condition);
        
        Task CommitAsync();
        #endregion
    }
}