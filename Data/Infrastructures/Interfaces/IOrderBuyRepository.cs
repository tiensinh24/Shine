using System.Collections.Generic;
using Shine.Data.Dto.OrderBuies;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface IOrderBuyRepository
    {
        IEnumerable<OrderBuyDto> GetOrders();
        OrderBuyDto GetOrder(int id);
        void UpdateOrder(OrderBuyDto orderBuy);
        void DeleteOrder(int id);
    }
}