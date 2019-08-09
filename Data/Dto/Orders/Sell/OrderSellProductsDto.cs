namespace Shine.Data.Dto.Orders.Sell {
    public class OrderSellProductsDto {
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public decimal Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Tax { get; set; }
        public decimal Rate { get; set; }
        public string Unit { get; set; }
    }
}
