using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

using Mapster;

using Microsoft.AspNetCore.Http;
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

        public async Task<IEnumerable<PhotoForPersonDto>> GetPhotosAsync(int personId) {
            var photos = await _context.Photos
                .Where(p => p.PersonId == personId)
                .ProjectToType<PhotoForPersonDto>()
                .ToListAsync();

            return photos;
        }

        public async Task<PhotoForPersonDto> GetPhotoAsync(int id) {
            var photo = await _context.Photos
                .FirstOrDefaultAsync(p => p.PhotoId == id);

            return photo.Adapt<PhotoForPersonDto>();
        }

#endregion

#region Actions

        public async Task<Photo> AddPhotoAsync(int personId, IFormFile file) {
            var mainPhoto = await _context.Photos
                .FirstOrDefaultAsync(p => p.IsMain == true && p.PersonId == personId);

            var uploadResult = this.UploadPhoto(file);
            Photo photoToAdd = null;

            if (uploadResult != null) {
                photoToAdd = new Photo() {
                PersonId = personId,
                PublicId = uploadResult.PublicId,
                PhotoUrl = uploadResult.SecureUri.ToString(),
                };
            }

            if (mainPhoto == null) {
                photoToAdd.IsMain = true;
            }

            await _context.Photos.AddAsync(photoToAdd);

            return photoToAdd;

        }

        public async Task<IEnumerable<Photo>> AddPhotosAsync(int personId, IEnumerable<IFormFile> files) {
            var mainPhoto = await _context.Photos
                .FirstOrDefaultAsync(p => p.IsMain == true && p.PersonId == personId);

            var photosToAdd = new List<Photo>();

            foreach (var file in files) {
                var uploadResult = this.UploadPhoto(file);

                if (uploadResult != null) {
                    var photo = new Photo() {
                    PersonId = personId,
                    PublicId = uploadResult.PublicId,
                    PhotoUrl = uploadResult.SecureUri.ToString(),
                    };

                    photosToAdd.Add(photo);
                }
            }

            if (mainPhoto == null) {
                photosToAdd[0].IsMain = true;
            }

            await _context.Photos.AddRangeAsync(photosToAdd);

            return photosToAdd;
        }

        private ImageUploadResult UploadPhoto(IFormFile file) {
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

            return uploadResult;
        }

#endregion

    }
}
