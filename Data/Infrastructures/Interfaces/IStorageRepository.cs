using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Shine.Data.Dto.Storages;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces {
    public interface IStorageRepository : IRepository {

#region Storage

#region Get Values

        Task<IEnumerable<StorageDto>> GetStoragesAsync();
        Task<StorageDto> GetStorageAsync(int storageId);

#endregion

#region Actions

#endregion

#endregion

#region StorageProduct

#region Get Values

        Task<IEnumerable<StorageProductsListDto>> GetLatestImportProductsAsync(int storageId);
        Task<IEnumerable<StorageProductsListDto>> GetLatestExportProductsAsync(int storageId);

#endregion

#region Actions

        Task<StorageProduct> AddStorageProductAsync(StorageProduct model);
        Task<bool> DeleteStorageProductAsync(int storageId, string id);

#endregion

#endregion

    }
}
