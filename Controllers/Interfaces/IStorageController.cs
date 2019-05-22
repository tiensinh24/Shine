using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using Shine.Data.Dto.Storages;

namespace Shine.Controllers.Interfaces {
    public interface IStorageController {
        Task<ActionResult<IEnumerable<StorageDto>>> GetStorages();
    }
}
