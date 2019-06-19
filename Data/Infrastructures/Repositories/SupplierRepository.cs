using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Orders.Buy.Reports;
using Shine.Data.Dto.Products;
using Shine.Data.Dto.Products.Buy;
using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Dto.Suppliers;
using Shine.Data.Dto.Suppliers.Reports;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories
{
    public class SupplierRepository : Repository, ISupplierRepository
    {

        #region Constructor
        public SupplierRepository(AppDbContext context, RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager, IConfiguration configuration
        ) : base(context, roleManager, userManager, configuration) { }

        #endregion

        #region Supplier

        #region Get Values
        public async Task<IEnumerable<SupplierListDto>> GetSuppliersAsync(
            Expression<Func<SupplierListDto, object>> sortColumn = null, string sortOrder = "asc")
        {
            var query = _context.Set<Supplier>()
                .Include(s => s.Country)
                .Include(s => s.Photos)
                .AsNoTracking()
                .ProjectToType<SupplierListDto>();

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
                query = query.OrderBy(s => s.FullName);
            }

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<SupplierSelectDto>> GetSuppliersSelectAsync(Expression<Func<SupplierSelectDto, object>> sortColumn, string sortOrder)
        {
            var query = _context.Set<Supplier>()
                .AsNoTracking()
                .ProjectToType<SupplierSelectDto>();

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
                query = query.OrderBy(s => s.FullName);
            }

            return await query.ToListAsync();
        }

        public async Task<PagedList<SupplierListDto>> GetPagedSuppliersAsync(
            PagingParams pagingParams, SortParams sortParams, string filter)
        {
            var source = _context.Set<Supplier>()
                .AsNoTracking()
                .Include(s => s.Country)
                .Include(s => s.Photos)
                .Include(s => s.Orders)
                .ProjectToType<SupplierListDto>();

            switch (sortParams.SortOrder)
            {
                case "asc":
                    switch (sortParams.SortColumn)
                    {
                        case "fullName":
                            source = source.OrderBy(s => s.FullName);
                            break;
                        case "dateOfBirth":
                            source = source.OrderBy(s => s.DateOfBirth);
                            break;
                        case "countryName":
                            source = source.OrderBy(s => s.CountryName);
                            break;
                        case "continentName":
                            source = source.OrderBy(s => s.ContinentName);
                            break;
                        case "rating":
                            source = source.OrderBy(s => s.Rating);
                            break;
                    }
                    break;

                case "desc":
                    switch (sortParams.SortColumn)
                    {
                        case "fullName":
                            source = source.OrderByDescending(s => s.FullName);
                            break;
                        case "dateOfBirth":
                            source = source.OrderByDescending(s => s.DateOfBirth);
                            break;
                        case "countryName":
                            source = source.OrderByDescending(s => s.CountryName);
                            break;
                        case "continentName":
                            source = source.OrderByDescending(s => s.ContinentName);
                            break;
                        case "rating":
                            source = source.OrderByDescending(s => s.Rating);
                            break;
                    }
                    break;

                default:
                    source = source.OrderBy(s => s.FullName);
                    break;
            }

            if (!string.IsNullOrEmpty(filter))
            {
                source = source.Where(s => (s.FullName + s.PersonNumber).ToLower().Contains(filter.ToLower()));
            }

            return await PagedList<SupplierListDto>.CreateAsync(source, pagingParams.PageIndex, pagingParams.PageSize);

        }

        public async Task<SupplierDetailDto> GetSupplierAsync(int id)
        {
            var query = await _context.Set<Supplier>()
                .AsNoTracking()
                .Include(s => s.Country)
                .Include(s => s.Photos)
                .Include(s => s.Orders)
                .FirstOrDefaultAsync(s => s.PersonId == id);

            return query.Adapt<SupplierDetailDto>();
        }

        #endregion

        #region Actions

        public async Task AddSupplierAsync(Supplier supplier)
        {
            await _context.Set<Supplier>().AddAsync(supplier);
        }

        public async Task<SupplierDto> UpdateSupplierAsync(Supplier supplier)
        {
            var sup = await _context.Set<Supplier>()
                .FirstOrDefaultAsync(s => s.PersonId == supplier.PersonId);

            if (sup != null)
            {
                sup.PersonNumber = supplier.PersonNumber;
                sup.FirstName = supplier.FirstName;
                sup.LastName = supplier.LastName;
                sup.Gender = supplier.Gender;
                sup.DateOfBirth = supplier.DateOfBirth;
                sup.Telephone = supplier.Telephone;
                sup.Fax = supplier.Fax;
                sup.CountryId = supplier.CountryId;
            }

            return sup.Adapt<SupplierDto>();
        }

        public async Task<SupplierDto> DeleteSupplierAsync(int id)
        {
            var supplier = await _context.Set<Supplier>()
                .FirstOrDefaultAsync(s => s.PersonId == id);

            if (supplier != null)
            {
                _context.Set<Supplier>().Remove(supplier);
            }

            return supplier.Adapt<SupplierDto>();
        }

        public async Task<bool> DeleteSuppliersAsync(string[] ids)
        {
            var suppliers = await _context.Set<Supplier>()
                .Where(s => ids.Contains(s.PersonId.ToString()))
                .ToListAsync();

            if (suppliers != null)
            {
                _context.Set<Supplier>().RemoveRange(suppliers);

                return true;
            }
            return false;
        }

        #endregion

        #endregion

        #region SupplierProduct

        #region Get Values

        public async Task<IEnumerable<ProductSelectDto>> GetProductsForSelectAsync(int supplierId)
        {
            var query = await _context.PersonProducts
                .AsNoTracking()
                .Include(p => p.Product)
                .Where(p => p.PersonId == supplierId)
                .ProjectToType<ProductSelectDto>()
                .ToListAsync();

            return query;
        }

        public async Task<PagedList<ProductsBySupplierDto>> GetPagedProductsAsync(
            PagingParams pagingParams, SortParams sortParams, string filter,
            Expression<Func<ProductsBySupplierDto, bool>> condition)
        {

            var source = _context.PersonProducts
                .AsNoTracking()
                .Include(p => p.Product)
                .ThenInclude(p => p.Category)
                .Include(p => p.Person)
                .ProjectToType<ProductsBySupplierDto>();

            switch (sortParams.SortOrder)
            {
                case "asc":
                    switch (sortParams.SortColumn)
                    {
                        case "productName":
                            source = source.OrderBy(p => p.ProductName);
                            break;
                        case "specification":
                            source = source.OrderBy(p => p.Specification);
                            break;
                        case "categoryName":
                            source = source.OrderBy(p => p.CategoryName);
                            break;
                    }
                    break;

                case "desc":
                    switch (sortParams.SortColumn)
                    {
                        case "productName":
                            source = source.OrderByDescending(p => p.ProductName);
                            break;
                        case "specification":
                            source = source.OrderByDescending(p => p.Specification);
                            break;
                        case "categoryName":
                            source = source.OrderByDescending(p => p.CategoryName);
                            break;
                    }
                    break;

                default:
                    source = source.OrderBy(c => c.ProductName);
                    break;
            }

            if (!string.IsNullOrEmpty(filter))
            {
                source = source.Where(p => (p.ProductName + p.CategoryName).ToLower().Contains(filter.ToLower()));
            }

            if (condition != null)
            {
                source = source.Where(condition);
            }

            return await PagedList<ProductsBySupplierDto>.CreateAsync(source, pagingParams.PageIndex, pagingParams.PageSize);
        }

        public JsonResult GetProductsNotBySupplier(int supplierId)
        {
            var productsAdded = _context.Set<PersonProduct>()
                .Include(p => p.Product)
                .ThenInclude(p => p.Category)
                .Where(p => p.PersonId == supplierId)
                .Select(p => p.ProductId);

            var productsNotAdded = _context.Set<ProductBuy>()
                .Include(p => p.Category)
                .Where(p => p.Category.CategoryType == true
                    && !productsAdded.Contains(p.ProductId))
                .OrderBy(p => p.Category.CategoryName)
                .ProjectToType<ProductBuyListDto>();

            var result = from b in productsNotAdded
                         group new { b.ProductId, b.ProductName, b.Specification } by b.CategoryName into g
                         select new
                         {
                             Category = g.Key,
                             Products = g.OrderBy(p => p.ProductName)
                         };

            return Json(result);
        }

        #endregion

        #endregion

        #region Actions
        public async Task AddSupplierProductAsync(PersonProduct model)
        {
            await _context.PersonProducts.AddAsync(model);
        }

        public async Task<PersonProductDto> DeleteSupplierProductAsync(PersonProduct model)
        {
            var entity = await _context.PersonProducts
                .FirstOrDefaultAsync(p => p.PersonId == model.PersonId
                    && p.ProductId == model.ProductId);

            if (entity != null)
            {
                _context.PersonProducts.Remove(entity);
            }

            return entity.Adapt<PersonProductDto>();

        }

        #endregion

        #region Orders

        public async Task<IEnumerable<SupplierOrdersDto>> GetOrdersAsync(int supplierId)
        {
            var orders = await _context.Set<OrderBuy>()
                .AsNoTracking()
                .Where(o => o.PersonId == supplierId)
                .ProjectToType<SupplierOrdersDto>()
                .ToListAsync();

            return orders;
        }

        public async Task<PagedList<SupplierOrdersDto>> GetPagedOrdersAsync(PagingParams pagingParams, SortParams sortParams, string filter, Expression<Func<SupplierOrdersDto, bool>> condition)
        {
            var source = _context.Set<OrderBuy>()
                .AsNoTracking()
                .ProjectToType<SupplierOrdersDto>();

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
                        case "rating":
                            source = source.OrderByDescending(p => p.Rating);
                            break;
                    }
                    break;

                default:
                    source = source.OrderByDescending(c => c.DateOfIssue);
                    break;
            }

            if (!string.IsNullOrEmpty(filter))
            {
                source = source.Where(p => (p.OrderNumber + p.DateOfIssue).ToLower().Contains(filter.ToLower()));
            }

            if (condition != null)
            {
                source = source.Where(condition);
            }

            return await PagedList<SupplierOrdersDto>.CreateAsync(source, pagingParams.PageIndex, pagingParams.PageSize);

        }

        #endregion

        #region Reports

        public async Task<PagedList<SupplierDebtDto>> GetPagedSupplierDebtAsync(
            PagingParams pagingParams, SortParams sortParams, string filter)
        {
            var source = _context.Set<Supplier>()
                .AsNoTracking()
                .GroupBy(s => new
                {
                    s.PersonId,
                    SupplierName = s.FirstName + " " + s.LastName,
                    MainPhotoUrl = s.Photos.FirstOrDefault(p => p.IsMain == true).PhotoUrl
                },
                    (key, element) => new SupplierDebtDto
                    {
                        SupplierId = key.PersonId,
                        SupplierName = key.SupplierName,
                        MainPhotoUrl = key.MainPhotoUrl,
                        Debt = element.Sum(e => e.Orders.Sum(o => o.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax))
                            - (o.Payments.Count() == 0 ? 0 : o.Payments.Sum(p => p.Amount))))
                    })
                .Where(o => o.Debt > 0);





            switch (sortParams.SortOrder)
            {
                case "asc":
                    switch (sortParams.SortColumn)
                    {
                        case "supplierName":
                            source = source.OrderBy(s => s.SupplierName);
                            break;
                        case "debt":
                            source = source.OrderBy(s => s.Debt);
                            break;
                    }
                    break;

                case "desc":
                    switch (sortParams.SortColumn)
                    {
                        case "supplierName":
                            source = source.OrderByDescending(s => s.SupplierName);
                            break;
                        case "debt":
                            source = source.OrderByDescending(s => s.Debt);
                            break;
                    }
                    break;

                default:
                    source = source.OrderBy(s => s.SupplierName);
                    break;
            }

            if (!String.IsNullOrEmpty(filter))
            {
                source = source.Where(s => s.SupplierName.ToLower().Contains(filter.ToLower()));
            }

            return await PagedList<SupplierDebtDto>.CreateAsync(source, pagingParams.PageIndex, pagingParams.PageSize);
        }

        public async Task<ActionResult<OrderDebtBySupplierDto>> GetOrderDebtsBySupplierAsync(int supplierId)
        {
            var orderDebts = await _context.Set<OrderBuy>()
                .AsNoTracking()
                .Include(o => o.ProductOrders)
                .Include(o => o.Payments)
                .Include(o => o.Person)
                .ProjectToType<OrderBuyDebtDto>()
                .Where(o => o.Debt > 0 && o.SupplierId == supplierId)
                .ToListAsync();


            var rs = new OrderDebtBySupplierDto
            {
                SupplierId = orderDebts.Select(o => o.SupplierId).FirstOrDefault(),
                SupplierName = orderDebts.Select(o => o.SupplierName).FirstOrDefault(),
                Orders = orderDebts.Select(o => new _OrderDebtBySupplierDto
                {
                    OrderId = o.OrderId,
                    OrderNumber = o.OrderNumber,
                    DateOfIssue = o.DateOfIssue,
                    TimeForPayment = o.TimeForPayment,
                    Debt = o.Debt
                })
            };

            return rs;
        }

        public object GetOrderBySupplierPivotMonth(SortParams sortParams)
        {
            var source = _context.Set<Supplier>()
                .AsNoTracking()
                .GroupBy(s => new
                {
                    s.PersonId,
                    SupplierName = s.FirstName + " " + s.LastName,
                    MainPhotoUrl = s.Photos.Where(p => p.IsMain == true).Select(p => p.PhotoUrl).ToList(),
                    // Result = s.Orders.Select(o => new
                    // {
                    //     Month = o.DateOfIssue.Month,
                    //     Value = o.ProductOrders.Sum(po => po.Quantity * po.Price * (1 + po.Tax))
                    // }).ToList()
                },
                    (key, element) => new
                    {
                        SupplierId = key.PersonId,
                        SupplierName = key.SupplierName,
                        MainPhotoUrl = key.MainPhotoUrl,
                        // Total = key.Result.Sum(r => r.Value),
                        // Result = key.Result,

                    }).ToList();

            // switch (sortParams.SortOrder)
            // {
            //     case "asc":
            //         switch (sortParams.SortColumn)
            //         {
            //             case "supplierName":
            //                 source = source.OrderBy(s => s.SupplierName);
            //                 break;
            //         }
            //         break;

            //     case "desc":
            //         switch (sortParams.SortColumn)
            //         {
            //             case "supplierName":
            //                 source = source.OrderByDescending(s => s.SupplierName);
            //                 break;
            //         }
            //         break;

            //     default:
            //         source = source.OrderBy(s => s.SupplierName);
            //         break;
            // }

            return source;
        }

        #endregion

    }
}
