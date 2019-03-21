using System.Collections.Generic;
using System.Linq;

using Mapster;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Newtonsoft.Json;

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
        public IEnumerable<CategoryBuy> GetCategories(BaseQueryParams queryParams)
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

            if (!string.IsNullOrEmpty(queryParams.PageNumber.ToString()))
            {
                query = query.Skip((queryParams.PageNumber - 1) * queryParams.PageSize)
                    .Take(queryParams.PageSize);
            }

            return query;

        }

        public CategoryBuy GetCategory(int id)
        {
            var query = _context.Set<CategoryBuy>().Select(c => new
            {
                c.CategoryId,
                    c.CategoryName
            }).FirstOrDefault(c => c.CategoryId == id);

            return query.Adapt<CategoryBuy>();
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

    }
}
