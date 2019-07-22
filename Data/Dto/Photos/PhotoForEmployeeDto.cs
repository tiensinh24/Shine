namespace Shine.Data.Dto.Photos {
    public class PhotoForEmployeeDto {
        public int EmployeeId { get; set; }
        public int PhotoId { get; set; }
        public string PhotoUrl { get; set; }
        public bool IsMain { get; set; }

    }
}
