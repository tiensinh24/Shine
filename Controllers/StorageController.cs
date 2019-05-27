using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Shine.Controllers.Interfaces;
using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Storages;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Controllers {

    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StorageController : ControllerBase, IStorageController {
#region Private Fields
        private readonly IStorageRepository _repository;

#endregion

#region Constructor

        public StorageController(IStorageRepository repository) {
            this._repository = repository;
        }

#endregion

#region Storage

#region Get Values

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StorageDto>>> GetStorages() {
            var storages = await _repository.GetStoragesAsync();

            return Ok(storages);
        }

        [HttpGet("{storageId}")]
        public async Task<ActionResult<StorageDto>> GetStorage(int storageId) {
            var storage = await _repository.GetStorageAsync(storageId);

            return storage;
        }

#endregion

#region Actions

#endregion

#endregion

#region StorageProducts

#region Get Values

        [HttpGet("{storageId}/products/latest-import")]
        public async Task<ActionResult<IEnumerable<StorageProductsListDto>>> GetLatestImportProducts(int storageId) {
            var products = await _repository.GetLatestImportProductsAsync(storageId);

            return Ok(products);
        }

        [HttpGet("{storageId}/products/latest-export")]
        public async Task<ActionResult<IEnumerable<StorageProductsListDto>>> GetLatestExportProducts(int storageId) {
            var products = await _repository.GetLatestExportProductsAsync(storageId);

            return Ok(products);

        }

        [HttpGet("{storageId}/storage-products/paged")]
        public async Task<ActionResult<Paged<StorageProductsListDto>>> GetPagedStorageProducts(int storageId, [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter) {
            var query = await _repository.GetPagedStorageProductsAsync(
                storageId, pagingParams, sortParams, filter);

            return new Paged<StorageProductsListDto>(query);
        }

#endregion

#region Actions

        [HttpPost("{storageId}/add-import")]
        public async Task<ActionResult<StorageProduct>> AddStorageProduct(StorageProduct model) {
            var query = await _repository.AddStorageProductAsync(model);

            if (query != null) {
                await _repository.CommitAsync();
            }

            return query;
        }

        [HttpPut("{storageId}/storage-products/{id}")]
        public async Task<ActionResult<StorageProduct>> UpdateStorageProduct(StorageProduct model) {
            var query = await _repository.UpdateStorageProductAsync(model);

            if (query == null) return NotFound();

            await _repository.CommitAsync();

            return query;
        }

        [HttpDelete("{storageId}/storage-products/{id}")]
        public async Task<bool> DeleteStorageProduct(int storageId, [FromRoute] string id) {
            var query = await _repository.DeleteStorageProductAsync(storageId, id);
            if (query) {
                await _repository.CommitAsync();
            }
            return query;
        }

        [HttpDelete("{storageId}/storage-products/list")]
        public async Task<bool> DeleteStorageProducts([FromHeader] string[] ids) {
            var query = await _repository.DeleteStorageProductsAsync(ids);

            if (query) {
                await _repository.CommitAsync();
            }

            return query;
        }

#endregion

#endregion
    }
}
