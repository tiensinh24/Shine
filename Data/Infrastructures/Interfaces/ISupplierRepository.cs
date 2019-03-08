using System.Collections.Generic;
using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Dto.Suppliers;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ISupplierRepository
    {
#region Supplier
        IEnumerable<SupplierDto> GetSuppliers();
        SupplierDto GetSupplier(int id);
        void UpdateSupplier(Supplier supplier);
        void DeleteSupplier(int id);
#endregion

#region SupplierProduct
        IEnumerable<SupplierProductDto> GetSupplierProductsDto();
        IEnumerable<SupplierProductDto> GetProductsForSupplier(int supplierId);
        IEnumerable<ProductsBySupplierDto> GetProductsBySupplier(int supplierId);
        IEnumerable<SupplierProductDto> GetSuppliersByProduct(int productId);
        void UpdateSupplierProduct(PersonProduct supplierProduct);
        void DeleteSupplierProduct(PersonProduct supplierProduct);
#endregion
    }
}
