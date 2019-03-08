namespace Shine.Data.Dto.Products.Buy
{
    public class ProductBuyDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Specification { get; set; }        
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}
