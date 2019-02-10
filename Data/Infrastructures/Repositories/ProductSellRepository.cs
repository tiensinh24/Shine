using System.Collections.Generic;
using System.Linq;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Shine.Data.Dto.Products;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories {
    public class ProductSellRepository : Repository, IProductSellRepository {
#region Constructor
        public ProductSellRepository (AppDbContext context, RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager, IConfiguration configuration
        ) : base (context, roleManager, userManager, configuration) { }
#endregion

        public IEnumerable<ProductSellListDto> GetProducts () {
            var query = _context.Products.Include (p => p.Category).Select (p => new {
                p.ProductId,
                    p.Name,
                    p.Specification,
                    p.Price,
                    p.Category.CategoryName
            }).AsNoTracking ();

            return query.Adapt<IEnumerable<ProductSellListDto>> ();
        }
    }
}
