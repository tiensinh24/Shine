namespace Shine.Data.Dto
{
    public class ProductsDto
    {
        public string Name { get; set; }
        public string Specification { get; set; }
        public decimal Price { get; set; }
        public bool ProductType { get; set; }
        public int CategoryId { get; set; }
    }
}