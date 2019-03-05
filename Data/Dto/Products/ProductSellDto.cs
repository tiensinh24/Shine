namespace Shine.Data.Dto.Products
{
    public class ProductSellDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Specification { get; set; }
        public decimal Price { get; set; }        
        public string CategoryName { get; set; }
    }
}