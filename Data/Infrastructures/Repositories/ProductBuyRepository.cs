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

namespace Shine.Data.Infrastructures.Repositories
{
    public class ProductBuyRepository : Repository, IProductBuyRepository
    {
#region Constructor        
        public ProductBuyRepository(AppDbContext context, RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager, IConfiguration configuration
        ) : base(context, roleManager, userManager, configuration) { }
#endregion

        public IEnumerable<ProductBuyListDto> GetProductListDto()
        {
            var query = _context.Products.OfType<ProductBuy>().Include(p => p.Category).Select(p => new
            {
                p.ProductId,
                    p.Name,
                    p.Specification,
                    p.Price,
                    p.CategoryId,
                    p.Category.CategoryName
            }).AsNoTracking();
            return query.Adapt<IEnumerable<ProductBuyListDto>>();
        }

        public ProductBuyDto GetProductDto(int id)
        {
            var query = _context.Set<ProductBuy>().Select(p => new
            {
                p.ProductId,
                    p.Name,
                    p.Specification,
                    p.Price,
                    p.CategoryId
            }).FirstOrDefault(p => p.ProductId == id);
            return query.Adapt<ProductBuyDto>();
        }

        public void UpdateProduct(ProductBuy productBuy)
        {
            var product = _context.Set<ProductBuy>().FirstOrDefault(p => p.ProductId == productBuy.ProductId);
            if (product != null)
            {
                product.Name = productBuy.Name;
                product.Specification = productBuy.Specification;
                product.Price = productBuy.Price;
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
    }
}
