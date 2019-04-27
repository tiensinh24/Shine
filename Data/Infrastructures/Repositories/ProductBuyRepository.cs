using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Newtonsoft.Json;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Products.Buy;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories {
    public class ProductBuyRepository : Repository, IProductBuyRepository {
#region Constructor        
        public ProductBuyRepository(AppDbContext context, RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager, IConfiguration configuration
        ) : base(context, roleManager, userManager, configuration) { }
#endregion

#region Get Values
        public async Task<IEnumerable<ProductBuyListDto>> GetProductsAsync(
            Expression<Func<ProductBuyListDto, object>> sortColumn = null, string sortOrder = "asc") {
            var query = _context.Set<ProductBuy>()
                .Include(p => p.Category)
                .AsNoTracking()
                .ProjectToType<ProductBuyListDto>();

            if (sortColumn != null) {
                if (sortOrder == "desc") {
                    query = query.OrderByDescending(sortColumn);
                } else {
                    query = query.OrderBy(sortColumn);
                }
            } else {
                query = query.OrderBy(p => p.ProductName);
            }

            return await query.ToListAsync();
        }

        public async Task<PagedList<ProductBuyListDto>> GetPagedProductsAsync(
            PagingParams pagingParams, SortParams sortParams, string filter,
            Expression<Func<ProductBuyListDto, bool>> condition) {
            var source = _context.Set<ProductBuy>()
                .AsNoTracking()
                .ProjectToType<ProductBuyListDto>();

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

            return await PagedList<ProductBuyListDto>.CreateAsync(source, pagingParams.PageIndex, pagingParams.PageSize);
        }

        public async Task<ProductBuyDetailDto> GetProductAsync(int productId) {
            var query = await _context.Set<ProductBuy>()
                .Include(p => p.Category)
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(p => p.ProductId == productId);

            return query.Adapt<ProductBuyDetailDto>();
        }

#endregion

#region Actions
        public async Task AddProductAsync(ProductBuy productBuy) {
            await _context.Set<ProductBuy>().AddAsync(productBuy);
        }

        public async Task<ProductBuyDto> UpdateProductAsync(ProductBuy productBuy) {
            var product = await _context.Set<ProductBuy>()
                .FirstOrDefaultAsync(p => p.ProductId == productBuy.ProductId);

            if (product != null) {
                product.ProductName = productBuy.ProductName;
                product.Specification = productBuy.Specification;
                product.CategoryId = productBuy.CategoryId;
            }

            return product.Adapt<ProductBuyDto>();
        }

        public async Task<ProductBuyDto> DeleteProductAsync(int productId) {
            var product = await _context.Set<ProductBuy>()
                .FirstOrDefaultAsync(p => p.ProductId == productId);

            if (product != null) {
                _context.Set<ProductBuy>().Remove(product);
            }

            return product.Adapt<ProductBuyDto>();
        }

        public async Task<bool> DeleteProductsAsync(string[] ids) {
            var products = await _context.Set<ProductBuy>()
                .Where(c => ids.Contains(c.ProductId.ToString()))
                .ToListAsync();

            if (products != null) {
                _context.Set<ProductBuy>().RemoveRange(products);

                return true;
            }
            return false;
        }
#endregion
    }
}
