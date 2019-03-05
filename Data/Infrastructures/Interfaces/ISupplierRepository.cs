using System.Collections.Generic;

using Shine.Data.Dto.Suppliers;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ISupplierRepository
    {
        IEnumerable<SupplierDto> GetSuppliers();
        SupplierDto GetSupplier(int id);
        void UpdateSupplier(Supplier supplier);
        void DeleteSupplier(int id);
    }
}
