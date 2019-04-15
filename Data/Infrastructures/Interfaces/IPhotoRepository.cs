using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;

using Shine.Data.Dto.Photos;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces {
    public interface IPhotoRepository : IRepository {

#region Get Values

        Task<PhotoDto> GetPhotoAsync(int id);

#endregion

#region Actions

        Task<Photo> AddPhotoAsync(PhotoUploadDto model);

#endregion
    }
}
