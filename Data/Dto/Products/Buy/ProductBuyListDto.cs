namespace Shine.Data.Dto.Products.Buy {
    public class ProductBuyListDto {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Specification { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        public string PhotoUrl { get; set; }
    }
}
