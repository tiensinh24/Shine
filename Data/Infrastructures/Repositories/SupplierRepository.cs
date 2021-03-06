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
using Shine.Data.Dto.Orders;
using Shine.Data.Dto.Products;
using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Dto.Suppliers;
using Shine.Data.Dto.Suppliers.Reports;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories {
    public class SupplierRepository : Repository, ISupplierRepository {

        #region Constructor
        public SupplierRepository (AppDbContext context, RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager, IConfiguration configuration
        ) : base (context, roleManager, userManager, configuration) { }

        #endregion

        #region Supplier

        #region Get Values
        public async Task<IEnumerable<SupplierSelectDto>> GetSuppliersSelectAsync () {
            var query = await _context.Set<Supplier> ()
                .AsNoTracking ()
                .ProjectToType<SupplierSelectDto> ()
                .OrderBy (s => s.FullName)
                .ToListAsync ();

            return query;
        }

        public async Task<PagedList<SupplierListDto>> GetPagedSuppliersAsync (
            PagingParams pagingParams, SortParams sortParams, string filter) {
            var source = _context.Set<Supplier> ()
                .AsNoTracking ()
                .Include (s => s.Country)
                .Include (s => s.Photos)
                .Include (s => s.Orders)
                .ProjectToType<SupplierListDto> ();

            switch (sortParams.SortOrder) {
                case "asc":
                    switch (sortParams.SortColumn) {
                        case "fullName":
                            source = source.OrderBy (s => s.FullName);
                            break;
                        case "dateOfBirth":
                            source = source.OrderBy (s => s.DateOfBirth);
                            break;
                        case "countryName":
                            source = source.OrderBy (s => s.CountryName);
                            break;
                        case "continentName":
                            source = source.OrderBy (s => s.ContinentName);
                            break;
                        case "rating":
                            source = source.OrderBy (s => s.Rating);
                            break;
                    }
                    break;

                case "desc":
                    switch (sortParams.SortColumn) {
                        case "fullName":
                            source = source.OrderByDescending (s => s.FullName);
                            break;
                        case "dateOfBirth":
                            source = source.OrderByDescending (s => s.DateOfBirth);
                            break;
                        case "countryName":
                            source = source.OrderByDescending (s => s.CountryName);
                            break;
                        case "continentName":
                            source = source.OrderByDescending (s => s.ContinentName);
                            break;
                        case "rating":
                            source = source.OrderByDescending (s => s.Rating);
                            break;
                    }
                    break;

                default:
                    source = source.OrderBy (s => s.FullName);
                    break;
            }

            if (!string.IsNullOrEmpty (filter)) {
                source = source.Where (s => (s.FirstName + s.LastName + s.PersonNumber).ToLower ().Contains (filter.ToLower ()));
            }

            return await PagedList<SupplierListDto>.CreateAsync (source, pagingParams.PageIndex, pagingParams.PageSize);

        }

        public async Task<SupplierDetailDto> GetSupplierAsync (int supplierId) {
            var query = await _context.Set<Supplier> ()
                .AsNoTracking ()
                .Include (s => s.Country)
                .Include (s => s.Photos)
                .Include (s => s.Orders)
                .FirstOrDefaultAsync (s => s.PersonId == supplierId);

            return query.Adapt<SupplierDetailDto> ();
        }

        #endregion

        #region Actions

        public async Task AddSupplierAsync (Supplier supplier) {
            await _context.Set<Supplier> ().AddAsync (supplier);
        }

        public async Task<SupplierDto> UpdateSupplierAsync (Supplier supplier) {
            var sup = await _context.Set<Supplier> ()
                .FirstOrDefaultAsync (s => s.PersonId == supplier.PersonId);

            if (sup != null) {
                sup.PersonNumber = supplier.PersonNumber;
                sup.FirstName = supplier.FirstName;
                sup.LastName = supplier.LastName;
                sup.Gender = supplier.Gender;
                sup.DateOfBirth = supplier.DateOfBirth;
                sup.Telephone = supplier.Telephone;
                sup.Fax = supplier.Fax;
                sup.Email = supplier.Email;
                sup.Address = supplier.Address;
                sup.CountryId = supplier.CountryId;
            }

            return sup.Adapt<SupplierDto> ();
        }

        public async Task<SupplierDto> DeleteSupplierAsync (int id) {
            var supplier = await _context.Set<Supplier> ()
                .FirstOrDefaultAsync (s => s.PersonId == id);

            if (supplier != null) {
                _context.Set<Supplier> ().Remove (supplier);
            }

            return supplier.Adapt<SupplierDto> ();
        }

        public async Task<bool> DeleteSuppliersAsync (string[] ids) {
            var suppliers = await _context.Set<Supplier> ()
                .Where (s => ids.Contains (s.PersonId.ToString ()))
                .ToListAsync ();

            if (suppliers != null) {
                _context.Set<Supplier> ().RemoveRange (suppliers);

                return true;
            }
            return false;
        }

        #endregion

        #endregion

        #region SupplierProduct

        #region Get Values

        public async Task<IEnumerable<ProductSelectDto>> GetProductsForSelectAsync (int supplierId) {
            var query = await _context.PersonProducts
                .AsNoTracking ()
                .Include (p => p.Product)
                .Where (p => p.PersonId == supplierId)
                .ProjectToType<ProductSelectDto> ()
                .OrderBy (p => p.ProductName)
                .ToListAsync ();

            return query;
        }

        public async Task<PagedList<ProductsBySupplierDto>> GetPagedProductsAsync (
            int supplierId, PagingParams pagingParams, SortParams sortParams, string filter) {
            var source = _context.PersonProducts
                .AsNoTracking ()
                .Where (pp => pp.PersonId == supplierId)
                .ProjectToType<ProductsBySupplierDto> ();

            switch (sortParams.SortOrder) {
                case "asc":
                    switch (sortParams.SortColumn) {
                        case "productName":
                            source = source.OrderBy (p => p.ProductName);
                            break;
                        case "specification":
                            source = source.OrderBy (p => p.Specification);
                            break;
                        case "categoryName":
                            source = source.OrderBy (p => p.CategoryName);
                            break;
                    }
                    break;

                case "desc":
                    switch (sortParams.SortColumn) {
                        case "productName":
                            source = source.OrderByDescending (p => p.ProductName);
                            break;
                        case "specification":
                            source = source.OrderByDescending (p => p.Specification);
                            break;
                        case "categoryName":
                            source = source.OrderByDescending (p => p.CategoryName);
                            break;
                    }
                    break;

                default:
                    source = source.OrderBy (c => c.ProductName);
                    break;
            }

            if (!string.IsNullOrEmpty (filter)) {
                source = source.Where (p => (p.ProductName + p.CategoryName).ToLower ().Contains (filter.ToLower ()));
            }

            return await PagedList<ProductsBySupplierDto>.CreateAsync (source, pagingParams.PageIndex, pagingParams.PageSize);
        }

        public async Task<PagedList<ProductsBySupplierDto>> GetPagedProductsNotAddedAsync (
            int supplierId, PagingParams pagingParams, SortParams sortParams, string filter) {
            var productsAdded = _context.PersonProducts
                .AsNoTracking ()
                .Where (p => p.PersonId == supplierId)
                .Select (p => p.ProductId);

            var productsNotAdded = _context.Set<ProductBuy> ()
                .AsNoTracking ()
                .Where (p => !productsAdded.Contains (p.ProductId))
                .OrderBy (p => p.ProductName)
                // .ProjectToType<ProductsBySupplierDto>();
                .Select (p => new ProductsBySupplierDto {
                    PersonId = supplierId,
                        ProductId = p.ProductId,
                        ProductName = p.ProductName,
                        Specification = p.Specification,
                        CategoryId = p.CategoryId,
                        CategoryName = p.Category.CategoryName,
                        PhotoUrl = p.Photos.FirstOrDefault (pt => pt.ProductId == p.ProductId).PhotoUrl
                });

            switch (sortParams.SortOrder) {
                case "asc":
                    switch (sortParams.SortColumn) {
                        case "productName":
                            productsNotAdded = productsNotAdded.OrderBy (p => p.ProductName);
                            break;
                        case "specification":
                            productsNotAdded = productsNotAdded.OrderBy (p => p.Specification);
                            break;
                        case "categoryName":
                            productsNotAdded = productsNotAdded.OrderBy (p => p.CategoryName);
                            break;
                    }
                    break;

                case "desc":
                    switch (sortParams.SortColumn) {
                        case "productName":
                            productsNotAdded = productsNotAdded.OrderByDescending (p => p.ProductName);
                            break;
                        case "specification":
                            productsNotAdded = productsNotAdded.OrderByDescending (p => p.Specification);
                            break;
                        case "categoryName":
                            productsNotAdded = productsNotAdded.OrderByDescending (p => p.CategoryName);
                            break;
                    }
                    break;

                default:
                    productsNotAdded = productsNotAdded.OrderBy (c => c.ProductName);
                    break;
            }

            if (!string.IsNullOrEmpty (filter)) {
                productsNotAdded = productsNotAdded.Where (p => (p.ProductName + p.CategoryName).ToLower ().Contains (filter.ToLower ()));
            }

            return await PagedList<ProductsBySupplierDto>.CreateAsync (productsNotAdded, pagingParams.PageIndex, pagingParams.PageSize);

        }

        #endregion

        #endregion

        #region Actions
        public async Task<bool> AddSupplierProductAsync (PersonProduct model) {
            try {
                await _context.PersonProducts.AddAsync (model);
                return true;
            } catch (System.Exception) {
                return false;
            }
        }

        public async Task<PersonProductDto> DeleteSupplierProductAsync (PersonProduct model) {
            var entity = await _context.PersonProducts
                .FirstOrDefaultAsync (p => p.PersonId == model.PersonId &&
                    p.ProductId == model.ProductId);

            if (entity != null) {
                _context.PersonProducts.Remove (entity);
            }

            return entity.Adapt<PersonProductDto> ();

        }

        #endregion

        #region Orders

        public async Task<IEnumerable<SupplierOrdersDto>> GetOrdersAsync (int supplierId) {
            var orders = await _context.Set<OrderBuy> ()
                .AsNoTracking ()
                .Where (o => o.PersonId == supplierId)
                .ProjectToType<SupplierOrdersDto> ()
                .ToListAsync ();

            return orders;
        }

        public async Task<PagedList<SupplierOrdersDto>> GetPagedOrdersBySupplierAsync (PagingParams pagingParams, SortParams sortParams, string filter, int supplierId) {
            var source = _context.Set<OrderBuy> ()
                .AsNoTracking ()
                .ProjectToType<SupplierOrdersDto> ()
                .Where (s => s.PersonId == supplierId);

            switch (sortParams.SortOrder) {
                case "asc":
                    switch (sortParams.SortColumn) {
                        case "orderNumber":
                            source = source.OrderBy (p => p.OrderNumber);
                            break;
                        case "dateOfIssue":
                            source = source.OrderBy (p => p.DateOfIssue);
                            break;
                        case "rating":
                            source = source.OrderBy (p => p.Rating);
                            break;
                    }
                    break;

                case "desc":
                    switch (sortParams.SortColumn) {
                        case "orderNumber":
                            source = source.OrderByDescending (p => p.OrderNumber);
                            break;
                        case "dateOfIssue":
                            source = source.OrderByDescending (p => p.DateOfIssue);
                            break;
                        case "rating":
                            source = source.OrderByDescending (p => p.Rating);
                            break;
                    }
                    break;

                default:
                    source = source.OrderByDescending (c => c.DateOfIssue);
                    break;
            }

            if (!string.IsNullOrEmpty (filter)) {
                source = source.Where (p => (p.OrderNumber + p.DateOfIssue).ToLower ().Contains (filter.ToLower ()));
            }

            return await PagedList<SupplierOrdersDto>.CreateAsync (source, pagingParams.PageIndex, pagingParams.PageSize);

        }

        #endregion

        #region Reports

        public async Task<PagedList<SupplierDebtDto>> GetPagedSupplierDebtAsync (
            PagingParams pagingParams, SortParams sortParams, string filter) {
            var source = _context.Set<Supplier> ()
                .AsNoTracking ()
                .GroupBy (s => new {
                        s.PersonId,
                            SupplierName = s.FirstName + " " + s.LastName,
                            MainPhotoUrl = s.Photos.FirstOrDefault (p => p.IsMain == true).PhotoUrl
                    },
                    (key, element) => new SupplierDebtDto {
                        SupplierId = key.PersonId,
                            SupplierName = key.SupplierName,
                            MainPhotoUrl = key.MainPhotoUrl,
                            Debt = element.Sum (e => e.Orders.Sum (o => o.ProductOrders.Sum (po => po.Quantity * po.Price * (1 + po.Tax)) -
                                (o.Payments.Count () == 0 ? 0 : o.Payments.Sum (p => p.Amount))))
                    })
                .Where (o => o.Debt > 0);

            switch (sortParams.SortOrder) {
                case "asc":
                    switch (sortParams.SortColumn) {
                        case "supplierName":
                            source = source.OrderBy (s => s.SupplierName);
                            break;
                        case "debt":
                            source = source.OrderBy (s => s.Debt);
                            break;
                    }
                    break;

                case "desc":
                    switch (sortParams.SortColumn) {
                        case "supplierName":
                            source = source.OrderByDescending (s => s.SupplierName);
                            break;
                        case "debt":
                            source = source.OrderByDescending (s => s.Debt);
                            break;
                    }
                    break;

                default:
                    source = source.OrderBy (s => s.SupplierName);
                    break;
            }

            if (!String.IsNullOrEmpty (filter)) {
                source = source.Where (s => s.SupplierName.ToLower ().Contains (filter.ToLower ()));
            }

            return await PagedList<SupplierDebtDto>.CreateAsync (source, pagingParams.PageIndex, pagingParams.PageSize);
        }

        public async Task<ActionResult<IEnumerable<OrderDebtDto>>> GetOrderDebtsBySupplierAsync (int supplierId) {
            var orderDebts = await _context.Set<OrderBuy> ()
                .Where (o => o.PersonId == supplierId)
                .AsNoTracking ()
                .Select (o => new OrderDebtDto {
                    OrderId = o.OrderId,
                        OrderNumber = o.OrderNumber,
                        DateOfIssue = o.DateOfIssue,
                        TimeForPayment = o.TimeForPayment,
                        Debt = o.ProductOrders.Sum (po => po.Quantity * po.Price * (1 + po.Tax)) -
                        (o.Payments.Any () ? o.Payments.Sum (p => p.Amount) : 0)
                })
                .Where (o => o.Debt > 0)
                .ToListAsync ();

            return orderDebts;
        }

        public async Task<IEnumerable<SupplierDebtDto>> GetTopSupplierDebtAsync (int numRows) {
            var query = await _context.Set<Supplier> ()
                .AsNoTracking ()
                .GroupBy (s => new {
                        s.PersonId,
                            SupplierName = s.FirstName + " " + s.LastName,
                            MainPhotoUrl = s.Photos.FirstOrDefault (p => p.IsMain == true).PhotoUrl
                    },
                    (key, element) => new SupplierDebtDto {
                        SupplierId = key.PersonId,
                            SupplierName = key.SupplierName,
                            MainPhotoUrl = key.MainPhotoUrl,
                            Debt = element.Sum (e => e.Orders.Sum (o => o.ProductOrders.Sum (po => po.Quantity * po.Price * (1 + po.Tax)) -
                                (o.Payments.Count () == 0 ? 0 : o.Payments.Sum (p => p.Amount))))
                    })
                .Where (o => o.Debt > 0)
                .OrderByDescending (o => o.Debt)
                .Take (numRows)
                .ToListAsync ();

            return query;
        }

        public async Task<IEnumerable<OrderBySupplierPivotMonthDto>> GetOrderBySupplierPivotMonthAsync (int year) {
            var query = await _context.Set<OrderBuy> ()
                .AsNoTracking ()
                .Where (o => o.DateOfIssue.Year == year)
                .GroupBy (o => new { o.PersonId, SupplierName = o.Person.FirstName + " " + o.Person.LastName })
                .Select (g => new OrderBySupplierPivotMonthDto {
                    SupplierId = g.Key.PersonId,
                        SupplierName = g.Key.SupplierName,
                        Jan = g.Where (o => o.DateOfIssue.Month == 1).Sum (o => o.ProductOrders.Sum (po => po.Quantity * po.Price * (1 + po.Tax))),
                        Feb = g.Where (o => o.DateOfIssue.Month == 2).Sum (o => o.ProductOrders.Sum (po => po.Quantity * po.Price * (1 + po.Tax))),
                        Mar = g.Where (o => o.DateOfIssue.Month == 3).Sum (o => o.ProductOrders.Sum (po => po.Quantity * po.Price * (1 + po.Tax))),
                        Apr = g.Where (o => o.DateOfIssue.Month == 4).Sum (o => o.ProductOrders.Sum (po => po.Quantity * po.Price * (1 + po.Tax))),
                        May = g.Where (o => o.DateOfIssue.Month == 5).Sum (o => o.ProductOrders.Sum (po => po.Quantity * po.Price * (1 + po.Tax))),
                        Jun = g.Where (o => o.DateOfIssue.Month == 6).Sum (o => o.ProductOrders.Sum (po => po.Quantity * po.Price * (1 + po.Tax))),
                        Jul = g.Where (o => o.DateOfIssue.Month == 7).Sum (o => o.ProductOrders.Sum (po => po.Quantity * po.Price * (1 + po.Tax))),
                        Aug = g.Where (o => o.DateOfIssue.Month == 8).Sum (o => o.ProductOrders.Sum (po => po.Quantity * po.Price * (1 + po.Tax))),
                        Sep = g.Where (o => o.DateOfIssue.Month == 9).Sum (o => o.ProductOrders.Sum (po => po.Quantity * po.Price * (1 + po.Tax))),
                        Oct = g.Where (o => o.DateOfIssue.Month == 10).Sum (o => o.ProductOrders.Sum (po => po.Quantity * po.Price * (1 + po.Tax))),
                        Nov = g.Where (o => o.DateOfIssue.Month == 11).Sum (o => o.ProductOrders.Sum (po => po.Quantity * po.Price * (1 + po.Tax))),
                        Dec = g.Where (o => o.DateOfIssue.Month == 12).Sum (o => o.ProductOrders.Sum (po => po.Quantity * po.Price * (1 + po.Tax))),
                        Total = g.Sum (o => o.ProductOrders.Sum (po => po.Quantity * po.Price * (1 + po.Tax)))
                })
                .OrderBy (s => s.SupplierName)
                .ToListAsync ();

            return query;
        }

        public async Task<IEnumerable<OrderBySupplierPivotQuarterDto>> GetOrderBySupplierPivotQuarterAsync (int year) {
            var query = await _context.Set<OrderBuy> ()
                .AsNoTracking ()
                .Where (o => o.DateOfIssue.Year == year)
                .GroupBy (o => new { o.PersonId, SupplierName = o.Person.FirstName + " " + o.Person.LastName })
                .Select (g => new OrderBySupplierPivotQuarterDto {
                    SupplierId = g.Key.PersonId,
                        SupplierName = g.Key.SupplierName,
                        QuarterOne = g.Where (o => o.DateOfIssue.Month >= 1 && o.DateOfIssue.Month <= 3).Sum (o => o.ProductOrders.Sum (po => po.Quantity * po.Price * (1 + po.Tax))),
                        QuarterTwo = g.Where (o => o.DateOfIssue.Month >= 4 && o.DateOfIssue.Month <= 6).Sum (o => o.ProductOrders.Sum (po => po.Quantity * po.Price * (1 + po.Tax))),
                        QuarterThree = g.Where (o => o.DateOfIssue.Month >= 7 && o.DateOfIssue.Month <= 9).Sum (o => o.ProductOrders.Sum (po => po.Quantity * po.Price * (1 + po.Tax))),
                        QuarterFourth = g.Where (o => o.DateOfIssue.Month >= 10 && o.DateOfIssue.Month <= 12).Sum (o => o.ProductOrders.Sum (po => po.Quantity * po.Price * (1 + po.Tax))),
                        Total = g.Sum (o => o.ProductOrders.Sum (po => po.Quantity * po.Price * (1 + po.Tax)))
                })
                .OrderBy (s => s.SupplierName)
                .ToListAsync ();

            return query;
        }

        #endregion

    }
}