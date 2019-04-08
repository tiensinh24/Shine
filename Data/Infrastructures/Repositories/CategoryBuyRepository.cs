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
using Shine.Data.Dto.Categories.Buy;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories
{
    public class CategoryBuyRepository : Repository, ICategoryBuyRepository
    {
#region Constructor

        public CategoryBuyRepository(AppDbContext context, RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager, IConfiguration configuration
        ) : base(context, roleManager, userManager, configuration) { }
#endregion

#region Get Values
        public async Task<IEnumerable<CategoryBuyDto>> GetCategoriesAsync(
            Expression<Func<CategoryBuyDto, object>> sortColumn = null, string sortOrder = "asc")
        {
            var query = _context.Set<CategoryBuy>().AsNoTracking()
                .ProjectToType<CategoryBuyDto>();

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
                query = query.OrderBy(c => c.CategoryName);
            }

            return await query.ToListAsync();
        }

        public async Task<PagedList<CategoryBuyDto>> GetPagedCategoriesAsync(
            PagingParams pagingParams, SortParams sortParams, string filter)
        {
            var source = _context.Categories.OfType<CategoryBuy>()
                .AsNoTracking()
                .ProjectToType<CategoryBuyDto>();

            switch (sortParams.SortOrder)
            {
                case "asc":
                    switch (sortParams.SortColumn)
                    {
                        case "categoryName":
                            source = source.OrderBy(c => c.CategoryName);
                            break;
                        default:
                            source = source.OrderBy(c => c.CategoryId);
                            break;
                    }
                    break;

                case "desc":
                    switch (sortParams.SortColumn)
                    {
                        case "categoryName":
                            source = source.OrderByDescending(c => c.CategoryName);
                            break;
                        default:
                            source = source.OrderByDescending(c => c.CategoryId);
                            break;
                    }
                    break;

                default:
                    source = source.OrderBy(c => c.CategoryId);
                    break;
            }

            if (!string.IsNullOrEmpty(filter))
            {
                source = source.Where(c => c.CategoryName.ToLower().Contains(filter.ToLower()));
            }

            return await PagedList<CategoryBuyDto>.CreateAsync(source, pagingParams.PageIndex, pagingParams.PageSize);
        }

        public async Task<CategoryBuyDto> GetCategoryAsync(int id)
        {
            var query = await _context.Set<CategoryBuy>()
                .AsNoTracking()
                .ProjectToType<CategoryBuyDto>()
                .FirstOrDefaultAsync(c => c.CategoryId == id);

            return query;
        }
#endregion

#region Actions

        public async Task AddCategoryAsync(CategoryBuy categoryBuy)
        {
            await _context.Set<CategoryBuy>().AddAsync(categoryBuy);
        }

        public async Task<CategoryBuyDto> UpdateCategoryAsync(CategoryBuy categoryBuy)
        {
            var category = await _context.Set<CategoryBuy>()
                .FirstOrDefaultAsync(c => c.CategoryId == categoryBuy.CategoryId);

            if (category != null)
            {
                category.CategoryName = categoryBuy.CategoryName;
            }

            return category.Adapt<CategoryBuyDto>();
        }

        public async Task<CategoryBuyDto> DeleteCategoryAsync(int id)
        {
            var category = await _context.Set<CategoryBuy>()
                .FirstOrDefaultAsync(c => c.CategoryId == id);

            if (category != null)
            {
                _context.Set<CategoryBuy>().Remove(category);
            }

            return category.Adapt<CategoryBuyDto>();
        }

#endregion

    }
}
