using System.Collections.Generic;
using Shine.Data.Dto.Photos;

namespace Shine.Data.Dto.Products.Sell
{
    public class ProductSellDetailDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Specification { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        public IEnumerable<PhotoForProductDto> Photos { get; set; }
    }
}