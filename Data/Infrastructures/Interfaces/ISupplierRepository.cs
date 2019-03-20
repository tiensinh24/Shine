using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Shine.Data.Dto.SupplierProducts;
using Shine.Data.Dto.Suppliers;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ISupplierRepository : IRepository
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
        ProductsGroupBySupplierDto GetProductsGroupBySupplier(int supplierId);
        JsonResult GetProductsNotBySupplier(int supplierId);
        void UpdateSupplierProduct(PersonProduct supplierProduct);
        void DeleteSupplierProduct(PersonProduct supplierProduct);
#endregion
    }
}
