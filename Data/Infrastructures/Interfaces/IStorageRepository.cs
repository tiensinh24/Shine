using System.Collections.Generic;
using System.Threading.Tasks;

using Shine.Data.Dto.Storages;

namespace Shine.Data.Infrastructures.Interfaces {
    public interface IStorageRepository : IRepository {
        Task<IEnumerable<StorageDto>> GetStoragesAsync();
    }
}
