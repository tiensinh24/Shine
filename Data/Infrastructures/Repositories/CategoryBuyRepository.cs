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
        public IEnumerable<CategoryBuyDto> GetCategoryListDto()
        {
            return _context.Set<CategoryBuy>()
                .ProjectToType<CategoryBuyDto>().AsNoTracking();
        }

        public CategoryBuyDto GetCategoryDto(int id)
        {
            var query = _context.Set<CategoryBuy>().Select(c => new
            {
                c.CategoryId,
                    c.CategoryName
            }).FirstOrDefault(c => c.CategoryId == id);

            return query.Adapt<CategoryBuyDto>();
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
