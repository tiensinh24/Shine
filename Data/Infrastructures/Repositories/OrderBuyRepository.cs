using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Shine.Data.Dto.Orders.Buy;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories
{
    public class OrderBuyRepository : Repository, IOrderBuyRepository
    {
        private readonly DbSet<OrderBuy> _repository;

#region Constructor
        public OrderBuyRepository(AppDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager,
            IConfiguration configuration) : base(context, roleManager, userManager, configuration)
        {
            this._repository = _context.Set<OrderBuy>();
        }
#endregion

#region Sync
        public void DeleteOrder(int id)
        {
            var order = _repository.FirstOrDefault(o => o.OrderId == id);
            if (order != null)
            {
                _repository.Remove(order);
            }

        }

        public OrderBuyDto GetOrder(int id)
        {
            var order = _repository.Include(o => o.Person)
                .ProjectToType<OrderBuyDto>()
                .AsNoTracking()
                .FirstOrDefault(o => o.OrderId == id);

            return order;
        }
        public IEnumerable<OrderBuyDto> GetOrders()
        {
            var orders = _repository.Include(o => o.Person)
                .ProjectToType<OrderBuyDto>().AsNoTracking();

            return orders;
        }

        public void UpdateOrder(OrderBuy orderBuy)
        {
            var order = _repository.FirstOrDefault(o => o.OrderId == orderBuy.OrderId);
            if (order != null)
            {
                order.OrderNumber = orderBuy.OrderNumber;
                order.DateOfIssue = orderBuy.DateOfIssue;
                order.TimeForPayment = orderBuy.TimeForPayment;
                order.PersonId = orderBuy.PersonId;
            }
        }
#endregion

#region Async       

        public async Task<IEnumerable<OrderBuyDto>> GetOrdersAsync(Expression<Func<OrderBuyDto, object>> orderBy)
        {
            var orders = _repository.Include(o => o.Person)
                .ProjectToType<OrderBuyDto>();

            if (orderBy != null)
            {
                return await orders.OrderBy(orderBy).ToListAsync();
            }
            else
            {
                return await orders.ToListAsync();
            }

        }

        public async Task<OrderBuyDto> GetOrderAsync(int id)
        {
            var order = await _repository.Include(o => o.Person)
                .ProjectToType<OrderBuyDto>()
                .FirstOrDefaultAsync(o => o.OrderId == id);

            return order;
        }

        public async Task<OrderBuy> AddOrderAsync(OrderBuy orderBuy)
        {
            await _repository.AddAsync(orderBuy);
            return orderBuy;
        }

#region ProductOrder
        public async Task AddProductOrderAsync(ProductOrder productOrder)
        {
            await _context.Set<ProductOrder>().AddAsync(productOrder);
        }

        public async Task AddProductOrderRangeAsync(IEnumerable<ProductOrder> productOrders)
        {
            await _context.Set<ProductOrder>().AddRangeAsync(productOrders);
        }
#endregion

#endregion
    }
}
