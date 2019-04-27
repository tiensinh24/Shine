using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using CloudinaryDotNet.Actions;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Shine.Data.Dto.Photos;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces {
    public interface IPhotoRepository : IRepository {

#region Get Values

        Task<IEnumerable<PhotoDto>> GetPhotosAsync(Expression<Func<Photo, bool>> predicate);

        Task<PhotoDto> GetPhotoAsync(int photoId);

#endregion

#region Actions

        Task<PhotoDto> DeletePhotoAsync(int photoId);

#endregion

#region Person

        Task<Photo> AddPhotoForPersonAsync(int personId, [FromForm] IFormFile file);

        Task<PhotoForPersonDto> SetMainPhotoForPersonAsync(PhotoForPersonDto photo);

#endregion

#region Product

        Task<Photo> AddPhotoForProductAsync(int productId, [FromForm] IFormFile file);

        Task<PhotoForProductDto> SetMainPhotoForProductAsync(PhotoForProductDto photo);

#endregion

    }
}
