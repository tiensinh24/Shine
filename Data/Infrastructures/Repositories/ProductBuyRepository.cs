using System.Collections.Generic;
using System.Linq;

using Mapster;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Newtonsoft.Json;

using Shine.Data.Dto.Products.Buy;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories
{
    public class ProductBuyRepository : Repository, IProductBuyRepository
    {
#region Constructor        
        public ProductBuyRepository(AppDbContext context, RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager, IConfiguration configuration
        ) : base(context, roleManager, userManager, configuration) { }
#endregion

#region CRUD
        public IEnumerable<ProductBuyDto> GetProducts()
        {
            return _context.Set<ProductBuy>().Include(p => p.Category)
                .ProjectToType<ProductBuyDto>().AsNoTracking();
        }

        public ProductBuyDto GetProduct(int id)
        {
            return _context.Set<ProductBuy>().ProjectToType<ProductBuyDto>()
                .FirstOrDefault(p => p.ProductId == id);
        }

        public void UpdateProduct(ProductBuy productBuy)
        {
            var product = _context.Set<ProductBuy>().FirstOrDefault(p => p.ProductId == productBuy.ProductId);
            if (product != null)
            {
                product.ProductName = productBuy.ProductName;
                product.Specification = productBuy.Specification;
                product.CategoryId = productBuy.CategoryId;
            }
        }

        public void DeleteProduct(int id)
        {
            var product = _context.Set<ProductBuy>().FirstOrDefault(p => p.ProductId == id);
            if (product != null)
            {
                _context.Set<ProductBuy>().Remove(product);
            }
        }
#endregion
    }
}
