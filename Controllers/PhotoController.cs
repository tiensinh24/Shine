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

        [HttpGet("{id}")]
        public async Task<ActionResult<PhotoDto>> GetPhoto(int id) {
            var photo = await _repository.GetPhotoAsync(id);

            if (photo == null) {
                return NotFound();
            }

            return photo;
        }

#endregion

#region Actions

        [HttpPost]
        public async Task<ActionResult<PhotoDto>> AddPhotoForPerson([FromForm] PhotoUploadDto model) {
            var photo = await _repository.AddPhotoAsync(model);

            if (photo != null)
                await _repository.CommitAsync();

            return CreatedAtAction(nameof(GetPhoto), new { id = photo.PhotoId }, photo.Adapt<PhotoDto>());

        }

#endregion

    }
}
