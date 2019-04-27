namespace Shine.Data.Dto.Photos {
    public class PhotoForProductDto {
        public int ProductId { get; set; }
        public int PhotoId { get; set; }
        public string PhotoUrl { get; set; }
        public bool IsMain { get; set; }
    }
}
