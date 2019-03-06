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

        public IEnumerable<ProductSell> GetProducts () {
            var query = _context.Set<ProductSell>().Include (p => p.Category).Select (p => new {
                p.ProductId,
                    p.Name,
                    p.Specification,
                    p.Category.CategoryName
            }).AsNoTracking ();

            return query.Adapt<IEnumerable<ProductSell>> ();
        }

        public void UpdateProduct(ProductSell productSell)
        {
            var product = _context.Set<ProductSell>().FirstOrDefault(p => p.ProductId == productSell.ProductId);
            if (product != null)
            {
                product.Name = productSell.Name;
                product.Specification = productSell.Specification;
                product.CategoryId = productSell.CategoryId;
            }
        }

        public void DeleteProduct(int id)
        {
            var product = _context.Set<ProductSell>().FirstOrDefault(p => p.ProductId == id);
            if (product != null)
            {
                _context.Set<ProductSell>().Remove(product);
            }
        }
    }
}
