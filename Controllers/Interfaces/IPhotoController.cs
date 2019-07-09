using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Shine.Data.Dto.Photos;
using Shine.Data.Models;

namespace Shine.Controllers.Interfaces {
    public interface IPhotoController {

#region Get Values

        Task<ActionResult<PhotoDto>> GetPhoto(int photoId);

        Task<ActionResult<IEnumerable<PhotoForPersonDto>>> GetPhotosForPerson(int personId);

        Task<ActionResult<IEnumerable<PhotoForProductDto>>> GetPhotosForProduct(int productId);

#endregion

#region Actions

        Task<ActionResult<PhotoDto>> DeletePhoto(int photoId);

#endregion

#region Person
        Task<ActionResult<PhotoForPersonDto>> AddPhotoForPerson(int personId, [FromForm] IFormFile file);

        Task<ActionResult<PhotoForPersonDto>> SetMainPhotoForPerson(PhotoForPersonDto photo);

#endregion

#region Product
        Task<ActionResult<PhotoForProductDto>> AddPhotoForProduct(int productId, [FromForm] IFormFile file);

        Task<ActionResult<PhotoForProductDto>> SetMainPhotoForProduct(PhotoForProductDto photo);
#endregion

    }
}
