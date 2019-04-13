using System;

namespace Shine.Data.Dto.Photos {
    public class PhotoDto {
        public int PhotoId { get; set; }
        public string PublicId { get; set; }
        public string PhotoUrl { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
    }
}
