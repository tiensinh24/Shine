using System.Threading.Tasks;

using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

using Mapster;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

using Shine.Data.Dto.Photos;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;
using Shine.Helpers;

namespace Shine.Data.Infrastructures.Repositories {
    public class PhotoRepository : Repository, IPhotoRepository {

#region Private Fields

        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

#endregion

#region Constructor
        public PhotoRepository(IOptions<CloudinarySettings> cloudinaryConfig, AppDbContext context, RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager, IConfiguration configuration) : base(context, roleManager, userManager, configuration) {
            this._cloudinaryConfig = cloudinaryConfig;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);

        }

#endregion

#region Get Values

        public async Task<PhotoDto> GetPhotoAsync(int id) {
            var photo = await _context.Photos
                .FirstOrDefaultAsync(p => p.PhotoId == id);

            return photo.Adapt<PhotoDto>();
        }

#endregion

#region Actions

        public async Task<PhotoDto> AddPhotoForPersonAsync(int personId,
            PhotoForCreationDto photoForCreationDto) {

            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0) {
                using(var stream = file.OpenReadStream()) {
                    var uploadParams = new ImageUploadParams() {
                    File = new FileDescription(file.Name, stream),
                    Transformation = new Transformation()
                    .Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoForCreationDto.PhotoUrl = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = photoForCreationDto.Adapt<Photo>();

            await _context.Photos.AddAsync(photo);

            return photo.Adapt<PhotoDto>();

        }

#endregion

    }
}
