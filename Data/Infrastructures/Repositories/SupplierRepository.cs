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

using Newtonsoft.Json;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Products.Buy;
using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Dto.Suppliers;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;
using Shine.Data.Models.Interfaces;

namespace Shine.Data.Infrastructures.Repositories {
    public class SupplierRepository : Repository, ISupplierRepository {

#region Constructor
        public SupplierRepository(AppDbContext context, RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager, IConfiguration configuration
        ) : base(context, roleManager, userManager, configuration) { }

#endregion

#region Supplier

#region Get Values
        public async Task<IEnumerable<SupplierListDto>> GetSuppliersAsync(
            Expression<Func<SupplierListDto, object>> sortColumn = null, string sortOrder = "asc") {
            var query = _context.Set<Supplier>()
                .Include(s => s.Country)
                .Include(s => s.Photos)
                .AsNoTracking()
                .ProjectToType<SupplierListDto>();

            if (sortColumn != null) {
                if (sortOrder == "desc") {
                    query = query.OrderByDescending(sortColumn);
                } else {
                    query = query.OrderBy(sortColumn);
                }
            } else {
                query = query.OrderBy(s => s.FullName);
            }

            return await query.ToListAsync();
        }

        public async Task<PagedList<SupplierListDto>> GetPagedSuppliersAsync(
            PagingParams pagingParams, SortParams sortParams, string filter) {
            var source = _context.Set<Supplier>()
                .AsNoTracking()
                .Include(s => s.Country)
                .Include(s => s.Photos)
                .ProjectToType<SupplierListDto>();

            switch (sortParams.SortOrder) {
                case "asc":
                    switch (sortParams.SortColumn) {
                        case "fullName":
                            source = source.OrderBy(s => s.FullName);
                            break;
                        case "dateOfBirth":
                            source = source.OrderBy(s => s.DateOfBirth);
                            break;
                    }
                    break;

                case "desc":
                    switch (sortParams.SortColumn) {
                        case "fullName":
                            source = source.OrderByDescending(s => s.FullName);
                            break;
                        case "dateOfBirth":
                            source = source.OrderByDescending(s => s.DateOfBirth);
                            break;
                    }
                    break;

                default:
                    source = source.OrderBy(s => s.FullName);
                    break;
            }

            if (!string.IsNullOrEmpty(filter)) {
                source = source.Where(s => s.FullName.ToLower().Contains(filter.ToLower()));
            }

            return await PagedList<SupplierListDto>.CreateAsync(source, pagingParams.PageIndex, pagingParams.PageSize);

        }

        public async Task<SupplierDetailDto> GetSupplierAsync(int id) {
            var query = await _context.Set<Supplier>()
                .Include(s => s.Country)
                .Include(s => s.Photos)
                .FirstOrDefaultAsync(s => s.PersonId == id);

            return query.Adapt<SupplierDetailDto>();
        }

#endregion

#region Actions

        public async Task AddSupplierAsync(Supplier supplier) {
            await _context.Set<Supplier>().AddAsync(supplier);
        }

        public async Task<SupplierDto> UpdateSupplierAsync(Supplier supplier) {
            var sup = await _context.Set<Supplier>()
                .FirstOrDefaultAsync(s => s.PersonId == supplier.PersonId);

            if (sup != null) {
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

        public async Task<SupplierDto> DeleteSupplierAsync(int id) {
            var supplier = await _context.Set<Supplier>()
                .FirstOrDefaultAsync(s => s.PersonId == id);

            if (supplier != null) {
                _context.Set<Supplier>().Remove(supplier);
            }

            return supplier.Adapt<SupplierDto>();
        }

        public async Task<bool> DeleteSuppliersAsync(string[] ids) {
            var suppliers = await _context.Set<Supplier>()
                .Where(s => ids.Contains(s.PersonId.ToString()))
                .ToListAsync();

            if (suppliers != null) {
                _context.Set<Supplier>().RemoveRange(suppliers);

                return true;
            }
            return false;
        }

#endregion

#endregion

#region SupplierProduct

#region Get Values
        public async Task<IEnumerable<SupplierProductListDto>> GetSupplierProductsDto() {
            var query = await _context.PersonProducts
                .Include(p => p.Person)
                .Include(p => p.Product)
                .AsNoTracking()
                .ProjectToType<SupplierProductListDto>()
                .ToListAsync();

            return query;
        }

        public async Task<IEnumerable<ProductsBySupplierDto>> GetProductsBySupplierAsync(int supplierId) {
            var query = await _context.PersonProducts
                .Include(p => p.Product)
                .ThenInclude(p => p.Category)
                .Include(p => p.Person)
                .AsNoTracking()
                .ProjectToType<ProductsBySupplierDto>()
                .Where(p => p.PersonId == supplierId)
                .ToListAsync();

            return query;
        }

        public async Task<PagedList<ProductsBySupplierDto>> GetPagedProductsBySupplierAsync(
            PagingParams pagingParams, SortParams sortParams, string filter,
            Expression<Func<ProductsBySupplierDto, bool>> condition) {

            var source = _context.PersonProducts
                .Include(p => p.Product)
                .ThenInclude(p => p.Category)
                .Include(p => p.Person)
                .AsNoTracking()
                .ProjectToType<ProductsBySupplierDto>();

            switch (sortParams.SortOrder) {
                case "asc":
                    switch (sortParams.SortColumn) {
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
                    switch (sortParams.SortColumn) {
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

            if (!string.IsNullOrEmpty(filter)) {
                source = source.Where(p => (p.ProductName + p.CategoryName).ToLower().Contains(filter.ToLower()));
            }

            if (condition != null) {
                source = source.Where(condition);
            }

            return await PagedList<ProductsBySupplierDto>.CreateAsync(source, pagingParams.PageIndex, pagingParams.PageSize);
        }

        public JsonResult GetProductsNotBySupplier(int supplierId) {
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
            select new {
            Category = g.Key,
            Products = g.OrderBy(p => p.ProductName)
            };

            return Json(result);
        }

        Task<IEnumerable<SupplierProductListDto>> ISupplierRepository.GetSupplierProductsListAsync() {
            throw new NotImplementedException();
        }
#endregion

#endregion

#region Actions
        public async Task AddSupplierProductAsync(PersonProduct model) {
            await _context.PersonProducts.AddAsync(model);
        }

        public async Task<PersonProductDto> DeleteSupplierProductAsync(PersonProduct model) {
            var entity = await _context.PersonProducts
                .FirstOrDefaultAsync(p => p.PersonId == model.PersonId
                    && p.ProductId == model.ProductId);

            if (entity != null) {
                _context.PersonProducts.Remove(entity);
            }

            return entity.Adapt<PersonProductDto>();

        }

#endregion

    }
}
