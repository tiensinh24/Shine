using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using Shine.Data.Dto._Paging;
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

        Task<ActionResult<Paged<StorageProductsListDto>>> GetPagedStorageProducts(
            int storageId, [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter);

#endregion

#region Actions

        Task<ActionResult<StorageProduct>> AddStorageProduct(StorageProduct model);
        Task<ActionResult<StorageProduct>> UpdateStorageProduct(StorageProduct model);
        Task<bool> DeleteStorageProduct(int storageId, string id);
        Task<bool> DeleteStorageProducts([FromHeader] string[] ids);

#endregion

    }

#endregion
}
