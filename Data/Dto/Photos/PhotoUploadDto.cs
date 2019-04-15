using Microsoft.AspNetCore.Http;

namespace Shine.Data.Dto.Photos {
    public class PhotoUploadDto {

        public IFormFile File { get; set; }
        public string Description { get; set; }

        public bool IsMain { get; set; }

        public int PersonId { get; set; }

    }
}
