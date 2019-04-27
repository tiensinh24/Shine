using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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

        public async Task<IEnumerable<PhotoDto>> GetPhotosAsync(Expression<Func<Photo, bool>> predicate) {
            var photos = await _context.Photos
                .Where(predicate)
                .ProjectToType<PhotoDto>()
                .ToListAsync();

            return photos;
        }

        public async Task<PhotoDto> GetPhotoAsync(int photoId) {
            var photo = await _context.Photos
                .ProjectToType<PhotoDto>()
                .FirstOrDefaultAsync(p => p.PhotoId == photoId);

            return photo;
        }

#endregion

#region Actions

        public async Task<PhotoDto> DeletePhotoAsync(int photoId) {
            var photo = await _context.Photos
                .FirstOrDefaultAsync(p => p.PhotoId == photoId);

            if (photo != null) {
                _context.Photos.Remove(photo);
            }

            return photo.Adapt<PhotoDto>();
        }

#endregion

#region Person

        public async Task<Photo> AddPhotoForPersonAsync(int personId, IFormFile file) {
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

        public async Task<PhotoForPersonDto> SetMainPhotoForPersonAsync(PhotoForPersonDto photo) {
            var currentMain = await _context.Photos
                .Where(p => p.IsMain == true && p.PersonId == photo.PersonId)
                .FirstOrDefaultAsync();

            var photoToSet = await _context.Photos
                .FirstOrDefaultAsync(p => p.PhotoId == photo.PhotoId);

            if (photoToSet != null) {
                if (currentMain != null) {
                    currentMain.IsMain = false;
                }
                photoToSet.IsMain = true;
            }

            return photoToSet.Adapt<PhotoForPersonDto>();
        }
#endregion

#region Product

        public async Task<Photo> AddPhotoForProductAsync(int productId, IFormFile file) {
            var mainPhoto = await _context.Photos
                .FirstOrDefaultAsync(p => p.IsMain == true && p.ProductId == productId);

            var uploadResult = this.UploadPhoto(file);
            Photo photoToAdd = null;

            if (uploadResult != null) {
                photoToAdd = new Photo() {
                ProductId = productId,
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

        public async Task<PhotoForProductDto> SetMainPhotoForProductAsync(PhotoForProductDto photo) {
            var currentMain = await _context.Photos
                .Where(p => p.IsMain == true && p.ProductId == photo.ProductId)
                .FirstOrDefaultAsync();

            var photoToSet = await _context.Photos
                .FirstOrDefaultAsync(p => p.PhotoId == photo.PhotoId);

            if (photoToSet != null) {
                if (currentMain != null) {
                    currentMain.IsMain = false;
                }
                photoToSet.IsMain = true;
            }

            return photoToSet.Adapt<PhotoForProductDto>();
        }

#endregion

#region Private Methods
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
