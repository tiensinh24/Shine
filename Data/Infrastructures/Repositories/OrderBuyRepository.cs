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
using Shine.Data.Dto.Orders;
using Shine.Data.Dto.Orders.Buy;
using Shine.Data.Dto.Orders.Buy.Queries;
using Shine.Data.Dto.Orders.Buy.Reports;
using Shine.Data.Dto.Products;
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

    #region Get Values       

    public async Task<IEnumerable<OrderBuyListDto>> GetOrdersAsync(
        Expression<Func<OrderBuyListDto, object>> sortColumn, string sortOrder)
    {

      var query = _context.Set<OrderBuy>()
          .AsNoTracking()
          .Include(p => p.Person)
          .ProjectToType<OrderBuyListDto>();

      if (sortColumn != null)
      {
        if (sortOrder == "desc")
        {
          query = query.OrderByDescending(sortColumn);
        }
        else
        {
          query = query.OrderBy(sortColumn);
        }
      }
      else
      {
        query = query.OrderBy(p => p.DateOfIssue);
      }

      return await query.ToListAsync();
    }

    public async Task<PagedList<OrderBuyListDto>> GetPagedOrdersAsync(
        PagingParams pagingParams, SortParams sortParams, OrderBuyQuery queryParams, string filter
        )
    {
      var source = _context.Set<OrderBuy>()
          .AsNoTracking()
          .ProjectToType<OrderBuyListDto>();

      switch (sortParams.SortOrder)
      {
        case "asc":
          switch (sortParams.SortColumn)
          {
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
            case "employeeName":
              source = source.OrderBy(p => p.EmployeeName);
              break;
            case "rating":
              source = source.OrderBy(p => p.Rating);
              break;
          }
          break;

        case "desc":
          switch (sortParams.SortColumn)
          {
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
            case "employeeName":
              source = source.OrderByDescending(p => p.EmployeeName);
              break;
            case "rating":
              source = source.OrderByDescending(p => p.Rating);
              break;
          }
          break;

        default:
          source = source.OrderByDescending(c => c.DateOfIssue);
          break;
      }

      if (queryParams.SupplierId > 0)
      {
        source = source.Where(o => o.PersonId == queryParams.SupplierId);
      }

      if (queryParams.EmployeeId > 0)
      {
        source = source.Where(o => o.EmployeeId == queryParams.EmployeeId);
      }

      if (queryParams.FromDate < queryParams.ToDate)
      {
        source = source.Where(o => o.DateOfIssue >= queryParams.FromDate && o.DateOfIssue <= queryParams.ToDate);
      }

      if (!string.IsNullOrEmpty(filter))
      {
        source = source.Where(p => (p.OrderNumber + p.DateOfIssue + p.SupplierName).ToLower().Contains(filter.ToLower()));
      }

      return await PagedList<OrderBuyListDto>.CreateAsync(source, pagingParams.PageIndex, pagingParams.PageSize);
    }

    public async Task<OrderBuyDto> GetOrderAsync(int orderId)
    {
      var order = await _repository
          .AsNoTracking()
          .ProjectToType<OrderBuyDto>()
          .FirstOrDefaultAsync(o => o.OrderId == orderId);

      return order;
    }

    public async Task<OrderBuyDetailDto> GetOrderDetailAsync(int orderId)
    {
      var order = await _repository
          .AsNoTracking()
          .Include(o => o.Person)
          .Include(o => o.Employee)
          .Include(o => o.Payments)
          .Include(o => o.ProductOrders)
          .ThenInclude(p => p.Product)
          .ProjectToType<OrderBuyDetailDto>()
          .FirstOrDefaultAsync(o => o.OrderId == orderId);

      return order;
    }

    #endregion

    #region Actions
    public async Task<OrderBuy> AddOrderAsync(OrderBuy orderBuy)
    {
      await _repository.AddAsync(orderBuy);
      return orderBuy;
    }

    public async Task<OrderBuyDto> UpdateOrderAsync(OrderBuy orderBuy)
    {
      var order = await _context.Set<OrderBuy>()
          .FirstOrDefaultAsync(p => p.OrderId == orderBuy.OrderId);

      if (order != null)
      {
        order.OrderNumber = orderBuy.OrderNumber;
        order.DateOfIssue = orderBuy.DateOfIssue;
        order.TimeForPayment = orderBuy.TimeForPayment;
        order.PersonId = orderBuy.PersonId;
        order.EmployeeId = orderBuy.EmployeeId;
        order.Rating = orderBuy.Rating;
      }

      return order.Adapt<OrderBuyDto>();
    }

    public async Task<OrderBuyDto> DeleteOrderAsync(int orderId)
    {
      var order = await _context.Set<OrderBuy>()
          .FirstOrDefaultAsync(p => p.OrderId == orderId);

      if (order != null)
      {
        _context.Set<OrderBuy>().Remove(order);
      }

      return order.Adapt<OrderBuyDto>();
    }

    public async Task<bool> DeleteOrdersAsync(string[] ids)
    {
      var orders = await _context.Set<OrderBuy>()
          .Where(c => ids.Contains(c.OrderId.ToString()))
          .ToListAsync();

      if (orders != null)
      {
        _context.Set<OrderBuy>().RemoveRange(orders);

        return true;
      }
      return false;
    }

    #endregion

    #region LineItems

    #region Get Values

    public async Task<IEnumerable<ProductSelectDto>> GetProductsNotAddedToOrderBySupplierForSelect(int orderId, int supplierId)
    {
      var products = await _context.Set<ProductBuy>()
          .AsNoTracking()
          .Where(p => p.PersonProducts.Any(pp => pp.PersonId == supplierId)
              && !(_context.ProductOrders
                  .Where(po => po.OrderId == orderId)
                  .Select(po => po.ProductId)).Contains(p.ProductId))
          .ProjectToType<ProductSelectDto>()
          .ToListAsync();

      return products;
    }

    #endregion

    #region Actions
    public async Task<ProductOrder> AddProductOrderAsync(ProductOrder productOrder)
    {
      var lineItem = await _context.Set<ProductOrder>()
          .AddAsync(productOrder);

      return lineItem.Entity;
    }

    public async Task AddProductOrderRangeAsync(IEnumerable<ProductOrder> productOrders)
    {
      await _context.Set<ProductOrder>().AddRangeAsync(productOrders);
    }

    public async Task<ProductOrderDto> UpdateProductOrderAsync(ProductOrder productOrder)
    {
      var dbItem = await _context.ProductOrders
          .FirstOrDefaultAsync(p => p.ProductId == productOrder.ProductId
              && p.OrderId == productOrder.OrderId);

      if (dbItem != null)
      {
        dbItem.ProductId = productOrder.ProductId;
        dbItem.Quantity = productOrder.Quantity;
        dbItem.Price = productOrder.Price;
        dbItem.Tax = productOrder.Tax;
        dbItem.Rate = productOrder.Rate;
        dbItem.Unit = productOrder.Unit;
      }

      return dbItem.Adapt<ProductOrderDto>();
    }

    public async Task DeleteProductOrderAsync(int orderId, int productId)
    {
      var productOrder = await _context.Set<ProductOrder>()
          .FirstOrDefaultAsync(p => p.OrderId == orderId && p.ProductId == productId);
      if (productOrder != null)
      {
        _context.Set<ProductOrder>().Remove(productOrder);
      }
    }

    #endregion

    #endregion

    #region Reports

    public decimal GetOrdersSum(int year, int? month)
    {
      decimal query;

      if (month > 0)
      {
        query = _context.ProductOrders
        .AsNoTracking()
        .Where(po => po.Order.OrderType == true && po.Order.DateOfIssue.Year == year && po.Order.DateOfIssue.Month == month)
        .Sum(po => po.Quantity * po.Price * (1 + po.Tax));
      }
      else
      {
        query = _context.ProductOrders
        .AsNoTracking()
        .Where(po => po.Order.OrderType == true && po.Order.DateOfIssue.Year == year)
        .Sum(po => po.Quantity * po.Price * (1 + po.Tax));
      }

      return query;
    }

    public decimal GetOrdersCostSum(int year, int? month)
    {
      decimal query;

      if (month > 0)
      {
        query = _context.Costs
        .AsNoTracking()
        .Where(c => c.Order.OrderType == true && c.Order.DateOfIssue.Year == year && c.Order.DateOfIssue.Month == month)
        .Sum(c => c.Amount);
      }
      else
      {
        query = _context.Costs
        .AsNoTracking()
        .Where(c => c.Order.OrderType == true && c.Order.DateOfIssue.Year == year)
        .Sum(c => c.Amount);
      }

      return query;
    }

    public int GetOrdersCount(int year, int? month)
    {
      int query;

      if (month > 0)
      {
        query = _repository
        .AsNoTracking()
        .Where(o => o.DateOfIssue.Year == year && o.DateOfIssue.Month == month)
        .Count();
      }
      else
      {
        query = _repository
        .AsNoTracking()
        .Where(o => o.DateOfIssue.Year == year)
        .Count();
      }

      return query;
    }

    public async Task<IEnumerable<OrderAndCostPerMonthDto>> GetOrderAndCostPerMonthAsync(int year)
    {
      var query = await _context.Set<OrderBuy>()
        .AsNoTracking()
        .Where(o => o.DateOfIssue.Year == year && o.OrderType == true)
        .GroupBy(o => o.DateOfIssue.Month)
        .Select(g => new OrderAndCostPerMonthDto
        {
          Month = g.Key,
          Amount = g.Sum(o => o.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax))),
          Cost = g.Sum(o => o.Costs.Sum(c => c.Amount))
        })
        .ToListAsync();

      return query;
    }

    public Task<IEnumerable<OrderAndCostPerQuarterDto>> GetOrderAndCostPerQuarterAsync(int year)
    {
      throw new NotImplementedException();
    }

    public async Task<OrderBuyLatestDto> GetLatestOrderAsync()
    {
      var order = await _repository
        .AsNoTracking()
        .ProjectToType<OrderBuyLatestDto>()
        .OrderByDescending(o => o.DateOfIssue)
        .FirstOrDefaultAsync();

      return order;
    }

    public decimal GetTotalOrderDebt()
    {
      var debt = _repository
        .AsNoTracking()
        .Where(o => o.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax))
          - (o.Payments.Any() ? o.Payments.Sum(p => p.Amount) : 0) > 0)
        .Sum(o => o.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax))
          - (o.Payments.Any() ? o.Payments.Sum(p => p.Amount) : 0));

      return debt;
    }

    public async Task<IEnumerable<OrderValueDto>> GetTopOrderValueAsync(int numRows, int year, int? quarter, int? month)
    {

      var query = _repository.AsNoTracking()
        .Where(o => o.DateOfIssue.Year == year);

      // Get by month
      if (month >= 1 && month <= 12)
      {
        query = query.Where(o => o.DateOfIssue.Month == month);
      }

      // Get by quarter
      if (quarter >= 1 && quarter <= 4)
      {
        switch (quarter)
        {
          case 1:
            query = query.Where(
              o => o.DateOfIssue.Month >= 1 && o.DateOfIssue.Month <= 3
            );
            break;

          case 2:
            query = query.Where(
              o => o.DateOfIssue.Month >= 4 && o.DateOfIssue.Month <= 6
            );
            break;

          case 3:
            query = query.Where(
              o => o.DateOfIssue.Month >= 7 && o.DateOfIssue.Month <= 9
            );
            break;

          case 4:
            query = query.Where(
              o => o.DateOfIssue.Month >= 10 && o.DateOfIssue.Month <= 12
            );
            break;

          default:
            break;
        }
      }

      var orders = await query.ProjectToType<OrderValueDto>()
        .OrderByDescending(o => o.Value)
        .Take(numRows)
        .ToListAsync();

      return orders;
    }


    #endregion

  }
}
