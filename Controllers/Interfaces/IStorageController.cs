using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using Shine.Data.Dto.Storages;
using Shine.Data.Models;

namespace Shine.Controllers.Interfaces {
    public interface IStorageController {

#region Storage

#region Get Values

        Task<ActionResult<IEnumerable<StorageDto>>> GetStorages();
        Task<ActionResult<StorageDto>> GetStorage(int storageId);

#endregion

#region Actions

#endregion

#endregion

#region StorageProducts

#region Get Values

        Task<ActionResult<IEnumerable<StorageProductsListDto>>> GetLatestImportProducts(int storageId);
        Task<ActionResult<IEnumerable<StorageProductsListDto>>> GetLatestExportProducts(int storageId);

#endregion

#region Actions

        Task<ActionResult<StorageProduct>> AddStorageProduct(StorageProduct model);
        Task AddStorageProducts(IEnumerable<StorageProduct> models);

#endregion

    }

#endregion
}
