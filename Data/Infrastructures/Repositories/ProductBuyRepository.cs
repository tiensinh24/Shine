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

namespace Shine.Data.Infrastructures.Repositories
{
    public class ProductBuyRepository : Repository, IProductBuyRepository
    {
#region Constructor        
        public ProductBuyRepository(AppDbContext context, RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager, IConfiguration configuration
        ) : base(context, roleManager, userManager, configuration) { }
#endregion

#region Get Values
        public async Task<IEnumerable<ProductBuyListDto>> GetProductsAsync(
            Expression<Func<ProductBuyListDto, object>> sortColumn, string sortOrder)
        {
            var query = _context.Set<ProductBuy>()
                .Include(p => p.Category)
                .AsNoTracking()
                .ProjectToType<ProductBuyListDto>();

            if (sortOrder == "asc")
            {
                return await query.OrderBy(sortColumn).ToListAsync();
            }
            else
            {
                return await query.OrderByDescending(sortColumn).ToListAsync();
            }
        }

        public async Task<PagedList<ProductBuyListDto>> GetPagedProductsAsync(
            PagingParams pagingParams, SortParams sortParams, string filter)
        {
            var source = _context.Set<ProductBuy>()
                .AsNoTracking()
                .ProjectToType<ProductBuyListDto>();

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
                source = source.Where(p => p.ProductName.ToLower().Contains(filter.ToLower()));
            }

            return await PagedList<ProductBuyListDto>.CreateAsync(source, pagingParams.PageIndex, pagingParams.PageSize);
        }

        public async Task<ProductBuyListDto> GetProductAsync(int id)
        {
            var query = await _context.Set<ProductBuy>()
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.ProductId == id);

            return query.Adapt<ProductBuyListDto>();
        }

#endregion

#region Actions
        public async Task AddProductAsync(ProductBuy productBuy)
        {
            await _context.Set<ProductBuy>().AddAsync(productBuy);
        }

        public async Task<ProductBuyDto> UpdateProductAsync(ProductBuy productBuy)
        {
            var product = await _context.Set<ProductBuy>()
                .FirstOrDefaultAsync(p => p.ProductId == productBuy.ProductId);

            if (product != null)
            {
                product.ProductName = productBuy.ProductName;
                product.Specification = productBuy.Specification;
                product.CategoryId = productBuy.CategoryId;
            }

            return product.Adapt<ProductBuyDto>();
        }

        public async Task<ProductBuyDto> DeleteProductAsync(int id)
        {
            var product = await _context.Set<ProductBuy>()
                .FirstOrDefaultAsync(p => p.ProductId == id);

            if (product != null)
            {
                _context.Set<ProductBuy>().Remove(product);
            }

            return product.Adapt<ProductBuyDto>();
        }

#endregion
    }
}
