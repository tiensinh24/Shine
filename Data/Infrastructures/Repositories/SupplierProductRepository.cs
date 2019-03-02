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
        private readonly ProductBuyRepository _prodRepo;

        public SupplierProductRepository(AppDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager,
            IConfiguration configuration,
            SupplierRepository supRepo,
            ProductBuyRepository prodRepo) : base(context, roleManager, userManager, configuration)
        {
            _supRepo = supRepo;
            _prodRepo = prodRepo;
        }

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

        public IEnumerable<ProductBuyListDto> GetProductsBySupplier(int supplierId)
        {
            var query = _context.Set<ProductBuy>().Include(p => p.Category)
                .Include(p => p.PersonProducts)
                .ThenInclude(p => p.Person)
                
                .AsNoTracking();
            return query;
        }

        public ProductsGroupBySupplierDto GetProductsGroupBySupplier(int supplierId)
        {
            var supplier = _supRepo.GetSupplierDto(supplierId);
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
