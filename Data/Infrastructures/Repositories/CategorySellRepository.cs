using System.Collections.Generic;
using System.Linq;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Shine.Data.Dto.Categories;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories
{
    public class CategorySellRepository : Repository, ICategorySellRepository
    {
#region Constructor
        public CategorySellRepository (AppDbContext context, RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager, IConfiguration configuration
        ) : base (context, roleManager, userManager, configuration) { }
#endregion
        public IEnumerable<CategorySellDto> GetCategories ()
        {
            var query = _context.Set<CategorySell> ().Select (c => new
            {
                c.CategoryId,
                    c.CategoryName
            }).OrderBy (c => c.CategoryName).AsNoTracking ();

            return query.Adapt<IEnumerable<CategorySellDto>> ();
        }

        public CategorySellDto GetCategory (int id)
        {
            var query = _context.Set<CategorySell> ().Select (c => new
            {
                c.CategoryId,
                    c.CategoryName
            }).FirstOrDefault (c => c.CategoryId == id);

            return query.Adapt<CategorySellDto> ();
        }

    }
}
