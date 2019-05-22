using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Shine.Controllers.Interfaces;
using Shine.Data.Dto.Storages;
using Shine.Data.Infrastructures.Interfaces;

namespace Shine.Controllers {

    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StorageController : ControllerBase, IStorageController {
        private readonly IStorageRepository _repository;
        public StorageController(IStorageRepository repository) {
            this._repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StorageDto>>> GetStorages() {
            var storages = await _repository.GetStoragesAsync();

            return Ok(storages);
        }
    }
}
