using System.Collections.Generic;
using Shine.Data.Models;

namespace Shine.Data.Dto.Orders.Buy
{
    public class OrderBuyWithDetailsToAddDto
    {
        public OrderBuy OrderBuy { get; set; }
        public IEnumerable<ProductOrder> ProductOrders { get; set; }
    }
}