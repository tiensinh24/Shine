using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

using CloudinaryDotNet;

using Mapster;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

using Shine.Controllers.Interfaces;
using Shine.Data.Dto.Photos;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;
using Shine.Helpers;

namespace Shine.Controllers {
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PhotoController : ControllerBase, IPhotoController {

#region Private Fields

        private readonly IPhotoRepository _repository;

#endregion

#region Constructor

        public PhotoController(IPhotoRepository repository) {
            this._repository = repository;
        }

#endregion

#region Get Values

        [HttpGet("{photoId}")]
        public async Task<ActionResult<PhotoDto>> GetPhoto(int photoId) {
            var photo = await _repository.GetPhotoAsync(photoId);

            if (photo == null) {
                return NotFound();
            }

            return photo;
        }

#endregion

#region Actions

        [HttpDelete("{photoId}")]
        public async Task<ActionResult<PhotoDto>> DeletePhoto(int photoId) {
            var photo = await _repository.DeletePhotoAsync(photoId);

            if (photo == null) return NotFound();

            await _repository.CommitAsync();

            return photo;
        }

#endregion

#region Person

        [HttpPost("person/{personId}")]
        public async Task<ActionResult<PhotoForPersonDto>> AddPhotoForPerson(int personId, [FromForm] IFormFile file) {
            var photo = await _repository.AddPhotoForPersonAsync(personId, file);

            if (photo != null)
                await _repository.CommitAsync();

            return CreatedAtAction(nameof(GetPhoto), new { photoId = photo.PhotoId }, photo.Adapt<PhotoForPersonDto>());

        }

        [HttpPut("person/set-main")]
        public async Task<ActionResult<PhotoForPersonDto>> SetMainPhotoForPerson(PhotoForPersonDto photo) {
            var photoToSet = await _repository.SetMainPhotoForPersonAsync(photo);

            if (photoToSet == null) return NotFound();

            await _repository.CommitAsync();

            return photoToSet;
        }

#endregion

#region Product

        [HttpPost("product/{productId}")]
        public async Task<ActionResult<PhotoForProductDto>> AddPhotoForProduct(int productId, [FromForm] IFormFile file) {
            var photo = await _repository.AddPhotoForProductAsync(productId, file);

            if (photo != null)
                await _repository.CommitAsync();

            return CreatedAtAction(nameof(GetPhoto), new { photoId = photo.PhotoId }, photo.Adapt<PhotoForProductDto>());
        }

        [HttpPut("product/set-main")]
        public async Task<ActionResult<PhotoForProductDto>> SetMainPhotoForProduct(PhotoForProductDto photo) {
            var photoToSet = await _repository.SetMainPhotoForProductAsync(photo);

            if (photoToSet == null) return NotFound();

            await _repository.CommitAsync();

            return photoToSet;
        }

#endregion

    }
}
