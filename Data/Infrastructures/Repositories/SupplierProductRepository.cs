using System.Collections.Generic;
using System.Linq;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Shine.Data.Dto.Products;
using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Dto.Suppliers;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories
{
    public class SupplierProductRepository : Repository, ISupplierProductRepository
    {
        private readonly SupplierRepository _supRepo;

        public SupplierProductRepository(AppDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager,
            IConfiguration configuration,
            SupplierRepository supRepo) : base(context, roleManager, userManager, configuration)
        {
            _supRepo = supRepo;
        }

        public void DeleteSupplierProduct(PersonProduct supplierProduct)
        {
            _context.PersonProducts.Remove(supplierProduct);
        }

        public IEnumerable<SupplierProductDto> GetProductsForSupplier(int supplierId)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<SupplierProductDto> GetSupplierProductsDto()
        {
            var result = _context.PersonProducts
                .Include(p => p.Person).Include(p => p.Product)
                .Where(p => p.Product.ProductType == true &&
                    p.Person.PersonType == PersonType.Supplier)
                .ProjectToType<SupplierProductDto>().AsNoTracking();

            return result;

        }

        public IEnumerable<SupplierProductDto> GetSuppliersByProduct(int productId)
        {
            throw new System.NotImplementedException();
        }

        public void UpdateSupplierProduct(PersonProduct supplierProduct)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<ProductsBySupplierDto> GetProductsBySupplier(int supplierId)
        {
            var query = _context.Set<PersonProduct>()
                .Include(p => p.Product)
                .ThenInclude(p => p.Category)
                .Where(p => p.PersonId == supplierId)
                .ProjectToType<ProductsBySupplierDto>().AsNoTracking();

            return query;
        }

        public JsonResult GetProductsNotBySupplier(int supplierId)
        {
            var productsAdded = _context.Set<PersonProduct>()
                .Include(p => p.Product)
                .ThenInclude(p => p.Category)
                .Where(p => p.PersonId == supplierId)
                .Select(p => p.ProductId);

            var productsNotAdded = _context.Set<ProductBuy>()
                .Include(p => p.Category)
                .Where(p => p.Category.CategoryType == true)
                .Where(p => !productsAdded.Contains(p.ProductId))
                .OrderBy(p => p.Category.CategoryName)
                .ProjectToType<ProductBuyDto>();

            var result = from b in productsNotAdded
            group new { b.ProductId, b.Name, b.Specification } by b.CategoryName into g
            select new
            {
            Category = g.Key,
            Products = g.OrderBy(p => p.Name)
            };

            return Json(result);
        }

        public ProductsGroupBySupplierDto GetProductsGroupBySupplier(int supplierId)
        {
            var supplier = _supRepo.GetSupplier(supplierId);
            var products = this.GetProductsBySupplier(supplierId);

            var query = new ProductsGroupBySupplierDto()
            {
                Supplier = supplier,
                Products = products
            };
            return query;
        }
    }
}
