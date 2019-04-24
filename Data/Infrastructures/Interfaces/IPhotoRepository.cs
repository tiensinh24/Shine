using System.Collections.Generic;
using System.Threading.Tasks;

using CloudinaryDotNet.Actions;

using Microsoft.AspNetCore.Http;

using Shine.Data.Dto.Photos;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces {
    public interface IPhotoRepository : IRepository {

#region Get Values

        Task<IEnumerable<PhotoForPersonDto>> GetPhotosAsync(int personId);

        Task<PhotoForPersonDto> GetPhotoAsync(int id);

#endregion

#region Actions

        Task<Photo> AddPhotoAsync(int personId, IFormFile file);

        Task<PhotoForPersonDto> SetMainPhotoAsync(PhotoForPersonDto photo);

        Task<IEnumerable<Photo>> AddPhotosAsync(int personId, IEnumerable<IFormFile> files);

        Task<PhotoForPersonDto> DeletePhotoAsync(int id);

#endregion
    }
}
