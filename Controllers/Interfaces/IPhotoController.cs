using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Shine.Data.Dto.Photos;
using Shine.Data.Models;

namespace Shine.Controllers.Interfaces {
    public interface IPhotoController {

#region Get Values

        Task<ActionResult<IEnumerable<PhotoForPersonDto>>> GetPhotos(int personId);

        Task<ActionResult<PhotoForPersonDto>> GetPhoto(int id);

#endregion

#region Actions

        Task<ActionResult<IEnumerable<Photo>>> AddPhotosForPerson(int personId, [FromForm] IEnumerable<IFormFile> files);

        Task<ActionResult<PhotoForPersonDto>> AddPhotoForPerson(int personId, [FromForm] IFormFile file);

#endregion
    }
}
