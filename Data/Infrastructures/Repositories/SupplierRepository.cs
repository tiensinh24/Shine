using System.Collections.Generic;
using System.Linq;

using Mapster;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Newtonsoft.Json;

using Shine.Data.Dto.Products;
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

    }
}
