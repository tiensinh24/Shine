using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.CSharp.Scripting;
using Microsoft.CodeAnalysis.Scripting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Categories.Buy;
using Shine.Data.Extensions;
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

        public async Task<IEnumerable<CategoryBuySelectDto>> GetCategoriesAsync(
            Expression<Func<CategoryBuySelectDto, object>> sortColumn, string sortOrder)
        {
            var query = _context.Set<CategoryBuy>().AsNoTracking()
                .ProjectToType<CategoryBuySelectDto>();

            if (sortOrder == "asc")
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

        public async Task<PagedList<CategoryBuySelectDto>> GetPagedCategoriesAsync(
            PagingParams pagingParams, SortParams sortParams, string filter)
        {
            var source = _context.Set<CategoryBuy>()
                .AsNoTracking()
                .ProjectToType<CategoryBuySelectDto>();

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

            var predicate = PredicateBuilder.True<CategoryBuySelectDto>();

            if (!string.IsNullOrEmpty(filter))
            {
                source = source.Where((Expression<Func<CategoryBuySelectDto, bool>>) (c => c.CategoryId.ToString().ToLower().Contains(filter.ToLower())
                    || c.CategoryName.ToString().ToLower().Contains(filter.ToLower())));
            }

            return await PagedList<CategoryBuySelectDto>.CreateAsync(source, pagingParams.PageIndex, pagingParams.PageSize);
        }

    }
}
