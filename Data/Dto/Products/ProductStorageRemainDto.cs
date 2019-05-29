namespace Shine.Data.Dto.Products {
    public class ProductStorageRemainDto {
        public int ProductId { get; set; }
        public int StorageId { get; set; }
        public string ProductName { get; set; }
        public string StorageName { get; set; }
        public decimal Remain { get; set; }
    }
}
