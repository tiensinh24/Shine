using System.Collections.Generic;
using System.Linq;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Shine.Data.Dto.OrderBuies;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories
{
    public class OrderBuyRepository : Repository, IOrderBuyRepository
    {
        public OrderBuyRepository(AppDbContext context, RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager, IConfiguration configuration) : base(context, roleManager, userManager, configuration)
        { }

        public void DeleteOrder(int id)
        {
            throw new System.NotImplementedException();
        }

        public OrderBuyDto GetOrder(int id)
        {
            var order = _context.Set<OrderBuy>().Include(o => o.Person)
                .ProjectToType<OrderBuyDto>()
                .AsNoTracking()
                .FirstOrDefault(o => o.OrderId == id);
                
            return order;
                
        }

        public IEnumerable<OrderBuyDto> GetOrders()
        {
            var orders = _context.Set<OrderBuy>().Include(o => o.Person)
                .ProjectToType<OrderBuyDto>().AsNoTracking();
            return orders;
        }

        public void UpdateOrder(OrderBuyDto orderBuy)
        {
            throw new System.NotImplementedException();
        }
    }
}
