namespace Shine.Data.Dto.SupplierProducts
{
    public class ProductsBySupplierDto
    {
        public int SupplierId { get; set; }
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Specification { get; set; }
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}