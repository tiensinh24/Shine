namespace Shine.Data.Dto.Photos {
    public class PhotoForPersonDto {
        public int PersonId { get; set; }
        public int PhotoId { get; set; }
        public string PhotoUrl { get; set; }
        public bool IsMain { get; set; }

    }
}
