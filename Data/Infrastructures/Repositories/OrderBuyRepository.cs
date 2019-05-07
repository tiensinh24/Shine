using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Orders.Buy;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories {
    public class OrderBuyRepository : Repository, IOrderBuyRepository {
        private readonly DbSet<OrderBuy> _repository;

#region Constructor
        public OrderBuyRepository(AppDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager,
            IConfiguration configuration) : base(context, roleManager, userManager, configuration) {
            this._repository = _context.Set<OrderBuy>();
        }
#endregion

#region Get Values       

        public async Task<IEnumerable<OrderBuyListDto>> GetOrdersAsync(
            Expression<Func<OrderBuyListDto, object>> sortColumn, string sortOrder) {

            var query = _context.Set<OrderBuy>()
                .AsNoTracking()
                .Include(p => p.Person)
                .ProjectToType<OrderBuyListDto>();

            if (sortColumn != null) {
                if (sortOrder == "desc") {
                    query = query.OrderByDescending(sortColumn);
                } else {
                    query = query.OrderBy(sortColumn);
                }
            } else {
                query = query.OrderBy(p => p.DateOfIssue);
            }

            return await query.ToListAsync();
        }

        public async Task<PagedList<OrderBuyListDto>> GetPagedOrdersAsync(
            PagingParams pagingParams, SortParams sortParams, string filter,
            Expression<Func<OrderBuyListDto, bool>> condition) {
            var source = _context.Set<OrderBuy>()
                .AsNoTracking()
                .Include(o => o.Person)
                .ProjectToType<OrderBuyListDto>();

            switch (sortParams.SortOrder) {
                case "asc":
                    switch (sortParams.SortColumn) {
                        case "orderNumber":
                            source = source.OrderBy(p => p.OrderNumber);
                            break;
                        case "dateOfIssue":
                            source = source.OrderBy(p => p.DateOfIssue);
                            break;
                        case "timeForPayment":
                            source = source.OrderBy(p => p.TimeForPayment);
                            break;
                        case "supplierName":
                            source = source.OrderBy(p => p.SupplierName);
                            break;
                    }
                    break;

                case "desc":
                    switch (sortParams.SortColumn) {
                        case "orderNumber":
                            source = source.OrderByDescending(p => p.OrderNumber);
                            break;
                        case "dateOfIssue":
                            source = source.OrderByDescending(p => p.DateOfIssue);
                            break;
                        case "timeForPayment":
                            source = source.OrderByDescending(p => p.TimeForPayment);
                            break;
                        case "supplierName":
                            source = source.OrderByDescending(p => p.SupplierName);
                            break;
                    }
                    break;

                default:
                    source = source.OrderBy(c => c.DateOfIssue);
                    break;
            }

            if (!string.IsNullOrEmpty(filter)) {
                source = source.Where(p => (p.OrderNumber + p.DateOfIssue + p.SupplierName).ToLower().Contains(filter.ToLower()));
            }

            if (condition != null) {
                source = source.Where(condition);
            }

            return await PagedList<OrderBuyListDto>.CreateAsync(source, pagingParams.PageIndex, pagingParams.PageSize);
        }

        public async Task<OrderBuyDetailDto> GetOrderAsync(int id) {
            var order = await _repository
                .AsNoTracking()
                .Include(o => o.Person)
                .Include(o => o.Payments)
                .Include(o => o.ProductOrders)
                .ThenInclude(p => p.Product)
                .ProjectToType<OrderBuyDetailDto>()
                .FirstOrDefaultAsync(o => o.OrderId == id);

            return order;
        }

#endregion

#region Actions
        public async Task<OrderBuy> AddOrderAsync(OrderBuy orderBuy) {
            await _repository.AddAsync(orderBuy);
            return orderBuy;
        }

        public async Task<OrderBuyDto> UpdateOrderAsync(OrderBuy orderBuy) {
            var order = await _context.Set<OrderBuy>()
                .FirstOrDefaultAsync(p => p.OrderId == orderBuy.OrderId);

            if (order != null) {
                order.OrderNumber = orderBuy.OrderNumber;
                order.DateOfIssue = orderBuy.DateOfIssue;
                order.TimeForPayment = orderBuy.TimeForPayment;
                order.PersonId = orderBuy.PersonId;
            }

            return order.Adapt<OrderBuyDto>();
        }

        public async Task<OrderBuyDto> DeleteOrderAsync(int orderId) {
            var order = await _context.Set<OrderBuy>()
                .FirstOrDefaultAsync(p => p.OrderId == orderId);

            if (order != null) {
                _context.Set<OrderBuy>().Remove(order);
            }

            return order.Adapt<OrderBuyDto>();
        }

        public async Task<bool> DeleteOrdersAsync(string[] ids) {
            var orders = await _context.Set<OrderBuy>()
                .Where(c => ids.Contains(c.OrderId.ToString()))
                .ToListAsync();

            if (orders != null) {
                _context.Set<OrderBuy>().RemoveRange(orders);

                return true;
            }
            return false;
        }

#endregion

#region ProductOrder
        public async Task<IEnumerable<ProductOrderDto>> GetProductDetailByOrderAsync(int id) {
            var orderDetails = await _context.Set<ProductOrder>().Include(p => p.Product)
                .Where(p => p.OrderId == id)
                .ProjectToType<ProductOrderDto>().ToListAsync();

            return orderDetails;
        }

        public async Task<ProductOrder> AddProductOrderAsync(ProductOrder productOrder) {
            var added = await _context.Set<ProductOrder>().AddAsync(productOrder);

            return added.Entity;
        }

        public async Task AddProductOrderRangeAsync(IEnumerable<ProductOrder> productOrders) {
            await _context.Set<ProductOrder>().AddRangeAsync(productOrders);
        }

        public async Task DeleteProductOrderAsync(int orderId, int productId) {
            var productOrder = await _context.Set<ProductOrder>()
                .FirstOrDefaultAsync(p => p.OrderId == orderId && p.ProductId == productId);
            if (productOrder != null) {
                _context.Set<ProductOrder>().Remove(productOrder);
            }
        }

#endregion

    }
}
