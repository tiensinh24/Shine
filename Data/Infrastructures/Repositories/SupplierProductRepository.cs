using System.Collections.Generic;
using System.Linq;

using Mapster;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories
{
    public class SupplierProductRepository : Repository, ISupplierProductRepository
    {
        public SupplierProductRepository(AppDbContext context, RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager, IConfiguration configuration) : base(context, roleManager, userManager, configuration) { }

        public void DeleteSupplierProduct(int personId, int productId)
        {
            var entity = _context.PersonProducts.Where(
                p => p.PersonId == personId && p.ProductId == productId
            ).FirstOrDefault();
            _context.PersonProducts.Remove(entity);
        }

        public IEnumerable<SupplierProductDto> GetProductsForSupplier(int supplierId)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<SupplierProductDto> GetSupplierProductsDto()
        {
            var result = _context.PersonProducts
                .Include(p => p.Person).Include(p => p.Product)
                .Where(p => p.Product.ProductType == true
                    && p.Person.PersonType == PersonType.Supplier)
                .ProjectToType<SupplierProductDto>().AsNoTracking();

            return result;

        }

        public IEnumerable<SupplierProductDto> GetSuppliersForProduct(int productId)
        {
            throw new System.NotImplementedException();
        }

        public void UpdateSupplierProduct(PersonProduct supplierProduct)
        {
            throw new System.NotImplementedException();
        }

        public JsonResult GetProductsGroupBySupplier(int supplierId)
        {
            var query = _context.PersonProducts
                .Include(p => p.Person).Include(p => p.Product)
                .Where(p => p.Product.ProductType == true
                    && p.Person.PersonType == PersonType.Supplier)
                .ProjectToType<SupplierProductDto>().AsNoTracking();

            var result = from b in query
            group new { b.ProductName, b.Specification } by new { b.PersonId, b.FullName } into g
            select new
            {
            Supplier = g.Key,
            Products = g
            };
            // return Json(result);
            var res = result.FirstOrDefault(p => p.Supplier.PersonId == supplierId);

            return Json(res);
        }
    }
}
