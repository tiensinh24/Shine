using System.Collections.Generic;
using System.Linq;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Shine.Data.Dto.Categories;
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
        public IEnumerable<CategoryDto> GetCategories()
        {
            var query = _context.Set<CategoryBuy>().Select(c => new
            {
                c.CategoryId,
                    c.CategoryName
            }).OrderBy(c => c.CategoryName).AsNoTracking();

            return query.Adapt<IEnumerable<CategoryDto>>();
        }

        public CategoryDto GetCategory(int id)
        {
            var query = _context.Set<CategoryBuy>().Select(c => new
            {
                c.CategoryId,
                    c.CategoryName
            }).FirstOrDefault(c => c.CategoryId == id);

            return query.Adapt<CategoryDto>();
        }

    }
}
