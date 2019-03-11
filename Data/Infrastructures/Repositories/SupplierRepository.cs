using System.Collections.Generic;
using System.Linq;

using Mapster;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Newtonsoft.Json;

using Shine.Data.Dto.Products.Buy;
using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Dto.Suppliers;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories
{
    public class SupplierRepository : Repository, ISupplierRepository
    {
#region Constructor        
        public SupplierRepository(AppDbContext context, RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager, IConfiguration configuration
        ) : base(context, roleManager, userManager, configuration) { }
#endregion

#region Supplier
        public IEnumerable<SupplierDto> GetSuppliers()
        {
            return _context.Set<Supplier>().Include(s => s.Country)
                .ProjectToType<SupplierDto>().AsNoTracking();

        }

        public SupplierDto GetSupplier(int id)
        {
            return _context.Set<Supplier>().ProjectToType<SupplierDto>()
                .FirstOrDefault(s => s.PersonId == id);
        }

        public void UpdateSupplier(Supplier supplier)
        {
            var supp = _context.Set<Supplier>().FirstOrDefault(s => s.PersonId == supplier.PersonId);
            if (supp != null)
            {
                supp.PersonNumber = supplier.PersonNumber;
                supp.FirstName = supplier.FirstName;
                supp.LastName = supplier.LastName;
                supp.Gender = supplier.Gender;
                supp.DateOfBirth = supplier.DateOfBirth;
                supp.Telephone = supplier.Telephone;
                supp.Fax = supplier.Fax;
                supp.CountryId = supplier.CountryId;
            }
        }

        public void DeleteSupplier(int id)
        {
            var supplier = _context.Set<Supplier>().FirstOrDefault(s => s.PersonId == id);
            if (supplier != null)
            {
                _context.Set<Supplier>().Remove(supplier);
            }
        }
#endregion

#region SupplierProduct
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
                .Where(p => p.Product.ProductType == true
                    && p.Person.PersonType == PersonType.Supplier)
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
                .ProjectToType<ProductsBySupplierDto>()
                .OrderBy(p => p.ProductName).AsNoTracking();

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
                .Where(p => p.Category.CategoryType == true
                    && !productsAdded.Contains(p.ProductId))
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
            var supplier = GetSupplier(supplierId);
            var products = this.GetProductsBySupplier(supplierId);

            var query = new ProductsGroupBySupplierDto()
            {
                Supplier = supplier,
                Products = products
            };
            return query;
        }
#endregion

    }
}
