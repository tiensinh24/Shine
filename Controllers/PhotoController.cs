using System.Security.Claims;
using System.Threading.Tasks;

using CloudinaryDotNet;

using Microsoft.AspNetCore.Authorization;
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
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;

#endregion

#region Constructor

        public PhotoController(IPhotoRepository repository) {
            this._repository = repository;
        }

#endregion

#region Actions

        [HttpPost("personId")]
        public async Task<ActionResult<PhotoDto>> AddPhotoForPerson(int personId) {
            var photo = await _repository.AddPhotoForPersonAsync(personId)
        }

#endregion

    }
}
