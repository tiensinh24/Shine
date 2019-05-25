using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Shine.Data.Dto.Products;
using Shine.Data.Infrastructures.Interfaces;

namespace Shine.Data.Infrastructures.Repositories {
    public class ProductRepository : Repository, IProductRepository {

        public ProductRepository(AppDbContext context, RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager, IConfiguration configuration) : base(context, roleManager, userManager, configuration) { }

        public async Task<IEnumerable<ProductSelectDto>> GetProductsSelectAsync() {
            var products = await _context.Products
                .AsNoTracking()
                .OrderBy(p => p.ProductName)
                .ProjectToType<ProductSelectDto>()
                .ToListAsync();

            return products;
        }
    }
}
