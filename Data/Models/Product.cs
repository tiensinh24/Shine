namespace Shine.Data.Models
{
    public class Product
    {
        public Product(int productId, string name, decimal price)
        {
            ProductId = productId;
            Name = name;
            Price = price;
        }
        public int ProductId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
    }
}