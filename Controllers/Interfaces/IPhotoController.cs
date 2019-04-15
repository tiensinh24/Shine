using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Shine.Data.Dto.Photos;

namespace Shine.Controllers.Interfaces {
    public interface IPhotoController {

#region Get Values

        Task<ActionResult<PhotoDto>> GetPhoto(int id);

#endregion

#region Actions

        Task<ActionResult<PhotoDto>> AddPhotoForPerson([FromForm] PhotoUploadDto model);

#endregion
    }
}
