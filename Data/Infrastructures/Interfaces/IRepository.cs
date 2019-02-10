using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface IRepository
    {
#region Sync
        IEnumerable<T> GetAll<T>() where T : class;
        T GetById<T>(Expression<Func<T, bool>> condition) where T : class;
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        void Commit();
#endregion

#region Async
        Task<IEnumerable<T>> GetAllAsync<T>() where T : class;
        Task<T> GetByIdAsync<T>(Expression<Func<T, bool>> condition) where T : class;
        Task AddAsync<T>(T entity) where T : class;
        Task UpdateAsync<T>(T entity) where T : class;
        Task DeleteAsync<T>(T entity) where T : class;
        Task CommitAsync();
#endregion
    }
}
