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

using Shine.Data.Dto.Categories.Buy;
using Shine.Data.Helpers;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Infrastructures.QueryParams;
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

        public async Task<IEnumerable<CategoryBuySelectDto>> GetCategoriesAsync(Expression<Func<CategoryBuySelectDto, object>> sortColumn = null, bool? sortOrder = true)
        {
            var query = _context.Set<CategoryBuy>().AsNoTracking()
                .ProjectToType<CategoryBuySelectDto>();

            if (sortOrder == true)
            {
                return await query.OrderBy(sortColumn).ToListAsync();

            }
            else
            {
                return await query.OrderByDescending(sortColumn).ToListAsync();
            }
        }

        public IEnumerable<CategoryBuy> GetCategoriesWithBaseParams(BaseQueryParams queryParams)
        {
            var query = _context.Set<CategoryBuy>().AsNoTracking();

            if (!string.IsNullOrEmpty(queryParams.Filter))
            {
                query = query.Where(c => c.CategoryName.ToLower().Contains(queryParams.Filter.ToLower()));
            }

            switch (queryParams.SortOrder)
            {
                case "desc":
                    query = query.OrderByDescending(c => c.CategoryName);
                    break;
                default:
                    query = query.OrderBy(c => c.CategoryName);
                    break;
            }

            if (queryParams.PageNumber > 0 && queryParams.PageSize > 0)
            {
                query = query.Skip((queryParams.PageNumber - 1) * queryParams.PageSize)
                    .Take(queryParams.PageSize);
            }

            return query;

        }

        public async Task<CategoryBuySelectDto> GetCategoryAsync(int id)
        {
            var query = await _context.Set<CategoryBuy>().AsNoTracking()
                .ProjectToType<CategoryBuySelectDto>()
                .FirstOrDefaultAsync(c => c.CategoryId == id);

            return query;
        }

        public void UpdateCategory(CategoryBuy categoryBuy)
        {
            var category = _context.Set<CategoryBuy>().FirstOrDefault(c => c.CategoryId == categoryBuy.CategoryId);
            if (category != null)
            {
                category.CategoryName = categoryBuy.CategoryName;
            }
        }

        public void DeleteCategory(int id)
        {
            var category = _context.Set<CategoryBuy>().FirstOrDefault(c => c.CategoryId == id);
            if (category != null)
            {
                _context.Set<CategoryBuy>().Remove(category);
            }
        }

        public async Task<PaginatedList<CategoryBuySelectDto>> GetPagedCategoriesAsync(
            int pageIndex, int pageSize,
            Expression<Func<CategoryBuySelectDto, object>> sortColumn = null, bool? sortOrder = true
        )
        {
            var source = _context.Set<CategoryBuy>().AsNoTracking()
                .ProjectToType<CategoryBuySelectDto>();

            if (sortOrder == true)
            {
                source = source.OrderBy(sortColumn);

            }
            else
            {
                source = source.OrderByDescending(sortColumn);
            }

            return await PaginatedList<CategoryBuySelectDto>.CreateAsync(source, pageIndex, pageSize);
        }
    }
}
